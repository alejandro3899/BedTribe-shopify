import {Suspense} from 'react';
import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Await,
  Link,
  useLoaderData,
  type MetaFunction,
  type FetcherWithComponents,
} from '@remix-run/react';

import {
  Image,
  Money,
  VariantSelector,
  type VariantOption,
  getSelectedProductOptions,
  CartForm,
  flattenConnection,
} from '@shopify/hydrogen';
import type {
  CartLineInput,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import {getVariantUrl} from '~/utils';
import ProductProperties from '~/components/pdp/ProductProperties';
import {
  PRODUCT_COMMUNITY,
  PRODUCT_QUERY,
  VARIANTS_QUERY,
  RECOMMENDED_PRODUCTS_QUERY,
} from '~/queries/pdp';
import {
  ProductFragment,
  ProductVariantFragment,
  ProductVariantsQuery,
} from 'storefrontapi.generated';
import minusSvg from '~/assets/minus.svg';
import plusSvg from '~/assets/plus.svg';
import ProductFeaturesSlider from '~/components/pdp/ProductFeaturesSlider';
import ProductUSP from '~/components/pdp/ProductUSP';
import ProductCommunity from '~/components/pdp/ProductCommunity';
import ProductFaqs from '~/components/pdp/ProductFaqs';
import RecommendedProducts from '~/components/pdp/RecommendedProducts';
import ProductLearnMore from '~/components/pdp/ProductLearnMore';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  const communityPromise = storefront.query(PRODUCT_COMMUNITY);
  const recommendedProductsPromise = storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
  );

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({
    product,
    variants,
    communityPromise,
    recommendedProductsPromise,
  });
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductFragment;
  request: Request;
}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  const {product, variants, communityPromise, recommendedProductsPromise} =
    useLoaderData<typeof loader>();
  const {selectedVariant} = product;
  return (
    <>
      <div className="con pt-24 md:pt-36 pb-10 md:pb-11">
        <div className="flex flex-col-reverse md:flex-row flex-wrap">
          <div className="w-full shrink-0 grow-0 md:basis-5/12 lg:basis-1/2 md:pr-5 lg:pr-10">
            <ProductMain
              selectedVariant={selectedVariant}
              product={product}
              variants={variants}
            />
          </div>
          <div className="w-full shrink-0 grow-0 md:basis-7/12 lg:basis-1/2">
            <ProductImage image={selectedVariant?.image} />
          </div>
        </div>
      </div>
      {product.properties?.references && (
        <ProductProperties
          data={flattenConnection(product.properties.references)}
        />
      )}
      {product.featuresSlider?.references && (
        <ProductFeaturesSlider
          data={flattenConnection(product.featuresSlider.references)}
        />
      )}
      {product.usp?.reference && <ProductUSP data={product.usp.reference} />}
      <Suspense>
        <Await resolve={communityPromise}>
          {(metaobject) => <ProductCommunity data={metaobject} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={recommendedProductsPromise}>
          {(recommendedProducts) => (
            <RecommendedProducts data={recommendedProducts} />
          )}
        </Await>
      </Suspense>
      {product.faqs?.references && (
        <ProductFaqs data={flattenConnection(product.faqs.references)} />
      )}
    </>
  );
}

function ProductImage({image}: {image: ProductVariantFragment['image']}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}

function ProductMain({
  selectedVariant,
  product,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Promise<ProductVariantsQuery>;
}) {
  const {title, descriptionHtml} = product;
  return (
    <div className="product-main">
      <h2>{title}</h2>
      <ProductPrice selectedVariant={selectedVariant} />
      <div className="mt-10 md:mt-14">
        <Suspense
          fallback={
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={[]}
            />
          }
        >
          <Await
            errorElement="There was a problem loading product variants"
            resolve={variants}
          >
            {(data) => (
              <ProductForm
                product={product}
                selectedVariant={selectedVariant}
                variants={data.product?.variants.nodes || []}
              />
            )}
          </Await>
        </Suspense>
      </div>
      {product.learn_more?.references && (
        <ProductLearnMore
          title={product.learn_more_title?.value}
          items={flattenConnection(product.learn_more.references)}
        />
      )}
    </div>
  );
}

function ProductPrice({
  selectedVariant,
}: {
  selectedVariant: ProductFragment['selectedVariant'];
}) {
  return (
    <div className="small text-sm md:text-xl mt-1 md:mt-2">
      {selectedVariant?.compareAtPrice ? (
        <>
          <div>
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
}

function ProductForm({
  product,
  selectedVariant,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Array<ProductVariantFragment>;
}) {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div className="flex flex-col">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => (
          <ProductOptions
            key={option.name}
            option={option}
            selectedVariant={selectedVariant}
          />
        )}
      </VariantSelector>
      <div className="flex space-x-5 order-last mt-7 md:mt-10">
        <div className="flex justify-between items-center border border-noir rounded-full px-5 py-4">
          <img src={minusSvg} className="h-6 w-6 cursor-pointer" />
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="appearance-none w-20 h-6 focus:outline-none"
          />
          <img src={plusSvg} className="h-6 w-6 cursor-pointer" />
        </div>
        <div>
          <AddToCartButton
            disabled={!selectedVariant || !selectedVariant.availableForSale}
            onClick={() => {
              window.location.href = window.location.href + '#cart-aside';
            }}
            lines={
              selectedVariant
                ? [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                    },
                  ]
                : []
            }
          >
            {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}

function ProductOptions({
  option,
  selectedVariant,
}: {
  option: VariantOption;
  selectedVariant: ProductFragment['selectedVariant'];
}) {
  return (
    <div
      className={`${
        option.name.toUpperCase() === 'SIZE'
          ? 'order-1'
          : 'order-3  mt-7 md:mt-10'
      }`}
      key={option.name}
    >
      <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-5">
        <p className="lg:basis-[100px] lg:shrink-0 lg:grow-0">
          {option.name}
          <span className="inline lg:hidden">
            :{' '}
            {selectedVariant?.selectedOptions?.find(
              (opt) => opt.name === option.name,
            )?.value || ''}
          </span>
        </p>
        <div className="flex -ml-1 -mt-2 flex-wrap">
          {option.values.map(({value, isAvailable, isActive, to}) => {
            return (
              <Link
                className={`text-xs md:text-sm px-4 py-2 rounded-full border border-noir mt-2 ml-1 whitespace-nowrap ${
                  isActive ? 'bg-noir text-cream' : ''
                } ${!isAvailable ? 'opacity-30' : ''}`}
                key={option.name + value}
                prefetch="intent"
                preventScrollReset
                replace
                to={to}
              >
                {value}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: CartLineInput[];
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}
