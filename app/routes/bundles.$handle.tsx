import {Await, useLoaderData} from '@remix-run/react';
import {Image, Money, flattenConnection} from '@shopify/hydrogen';
import {LoaderFunctionArgs, defer} from '@remix-run/server-runtime';
import {BUNDLE_QUERY} from '~/queries/bundle';
import {RECOMMENDED_PRODUCTS_QUERY, VARIANTS_QUERY} from '~/queries/pdp';
import {
  BundleProductItemFragment,
  FaqItemFragment,
  ProductVariantFragment,
  ProductVariantsQuery,
} from 'storefrontapi.generated';
import {Suspense, useEffect, useState} from 'react';
import {
  CartLineInput,
  ProductOption,
} from '@shopify/hydrogen/storefront-api-types';
import {useRootLoaderData} from '~/root';
import {AddToCartButton} from './products.$handle';
import AnimateHeight from 'react-animate-height';
import RecommendedProducts from '~/components/pdp/RecommendedProducts';
import ProductFeaturesSlider from '~/components/pdp/ProductFeaturesSlider';
import ProductFaqs from '~/components/pdp/ProductFaqs';

type BundleVariants = {
  [key: string]: ProductVariantsQuery;
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected bundle handle to be defined');
  }

  const bundleInfo = await storefront.query(BUNDLE_QUERY, {
    variables: {
      handle: handle,
    },
  });

  if (!bundleInfo.metaobject?.products?.references) {
    throw new Error('Expected bundle handle to be defined');
  }

  let bundleVariants: BundleVariants = {};

  const products = flattenConnection(bundleInfo.metaobject.products.references);
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const varaints = await storefront.query(VARIANTS_QUERY, {
      variables: {
        handle: product.handle,
      },
    });
    bundleVariants = {
      ...bundleVariants,
      [product.handle]: varaints,
    };
  }

  const recommendedProductsPromise = storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
  );

  return defer({bundleInfo, bundleVariants, recommendedProductsPromise});
}

export default function Bundle() {
  const {bundleInfo, bundleVariants, recommendedProductsPromise} =
    useLoaderData<typeof loader>();
  const [selectedVariants, setSelectedVariants] = useState<
    ProductVariantFragment[]
  >([]);

  useEffect(() => {
    if (bundleInfo.metaobject?.products?.references) {
      setSelectedVariants(
        flattenConnection(bundleInfo.metaobject.products.references).map(
          (product) => flattenConnection(product.variants)[0],
        ),
      );
    }
  }, []);

  const updateVariants = (
    prevVt: ProductVariantFragment,
    newVt: ProductVariantFragment,
  ) => {
    const _variants = [...selectedVariants];
    setSelectedVariants([
      ..._variants.filter((vt) => vt.id !== prevVt.id),
      newVt,
    ]);
  };

  if (!bundleInfo.metaobject?.products?.references) return null;
  const minPrice = flattenConnection(
    bundleInfo.metaobject.products.references,
  ).reduce(
    (sum, product, index) =>
      (sum += parseInt(product.priceRange.minVariantPrice.amount)),
    0,
  );

  return (
    <>
      <div className="con pt-24 md:pt-36 pb-10 md:pb-11">
        <div className="flex flex-col-reverse md:flex-row flex-wrap pb-[60px]">
          <div className="w-full shrink-0 grow-0 md:basis-5/12 lg:basis-1/2 mt-8 md:mt-0 md:pr-5 lg:pr-10">
            <div className="product-main">
              <h2>{bundleInfo.metaobject?.title?.value || ''}</h2>
              <div className="small text-sm md:text-xl mt-1 md:mt-2 uppercase">
                from{' '}
                <Money
                  data={{amount: minPrice.toString(), currencyCode: 'SGD'}}
                  as="span"
                />
              </div>
              <div className="mt-10 md:mt-14">
                {bundleInfo.metaobject?.products?.references && (
                  <div>
                    {flattenConnection(
                      bundleInfo.metaobject?.products?.references,
                    ).map((product, index) => (
                      <BundleProduct
                        product={product}
                        index={index}
                        bundleVariants={bundleVariants}
                        updateVariants={updateVariants}
                        key={product.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full py-7 flex [&_form]:w-full [&_button]:!w-full">
              <AddToCartButton
                availableForSale={selectedVariants.reduce(
                  (isAvailable, variant) =>
                    isAvailable && variant.availableForSale,
                  true,
                )}
                disabled={
                  !selectedVariants.reduce(
                    (isAvailable, variant) =>
                      isAvailable && variant.availableForSale,
                    true,
                  )
                }
                lines={selectedVariants.map((vt) => ({
                  merchandiseId: vt.id,
                  quantity: 1,
                }))}
              />
            </div>
            {bundleInfo.metaobject.dropdowns?.references && (
              <div className="py-8">
                <h6 className="text-black">Learn more about this bundle.</h6>
                <div className="border-t border-noir mt-5">
                  {flattenConnection(
                    bundleInfo.metaobject.dropdowns.references,
                  ).map((dropdown) => (
                    <BundleDropdown data={dropdown} key={dropdown.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full shrink-0 grow-0 md:basis-7/12 lg:basis-1/2">
            {bundleInfo.metaobject.image?.reference?.image && (
              <div className="bg-product-card rounded-lg md:sticky top-28">
                <Image
                  alt={
                    bundleInfo.metaobject.image.reference.image.altText ||
                    'Product Image'
                  }
                  aspectRatio="1/1"
                  data={bundleInfo.metaobject.image.reference.image}
                  key={bundleInfo.metaobject.image.reference.image.id}
                  sizes="(min-width: 45em) 50vw, 100vw"
                />
              </div>
            )}
          </div>
        </div>
        {bundleInfo.metaobject.features?.references && (
          <ProductFeaturesSlider
            data={flattenConnection(bundleInfo.metaobject.features.references)}
          />
        )}
        <Suspense>
          <Await resolve={recommendedProductsPromise}>
            {(recommendedProducts) => (
              <RecommendedProducts data={recommendedProducts} />
            )}
          </Await>
        </Suspense>
        {bundleInfo.metaobject.faqs?.references && (
          <ProductFaqs
            data={flattenConnection(bundleInfo.metaobject.faqs.references)}
          />
        )}
      </div>
    </>
  );
}

const BundleProduct = ({
  product,
  index,
  bundleVariants,
  updateVariants,
}: {
  product: BundleProductItemFragment;
  index: number;
  bundleVariants: BundleVariants;
  updateVariants: (
    prevVt: ProductVariantFragment,
    newVt: ProductVariantFragment,
  ) => void;
}) => {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantFragment>(flattenConnection(product.variants)[0]);

  const setVariant = (vt: ProductVariantFragment) => {
    updateVariants(selectedVariant, vt);
    setSelectedVariant(vt);
  };

  return (
    <div className="border-t border-shade pt-6 pb-8">
      <div className="flex space-x-7">
        <div className="basis-7 shrink-0 grow-0 h-7 rounded-full border border-black flex items-center justify-center">
          <span className="text-11 font-mono leading-none mt-1">
            {index + 1}
          </span>
        </div>
        <div className="flex flex-col space-y-8">
          <h5 className="text-black order-1">{product.title}</h5>
          {product.options.map((option) => (
            <BundleProductOptionSelector
              option={option}
              key={option.id}
              selectedVariant={selectedVariant}
              variants={bundleVariants[product.handle]}
              selectVariant={(vt) => setVariant(vt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BundleProductOptionSelector = ({
  option,
  selectedVariant,
  variants,
  selectVariant,
}: {
  option: Pick<ProductOption, 'id' | 'name' | 'values'>;
  selectedVariant: ProductVariantFragment;
  variants: ProductVariantsQuery;
  selectVariant: (vt: ProductVariantFragment) => void;
}) => {
  const {colors} = useRootLoaderData();

  return (
    <div
      key={option.id}
      className={`flex space-x-5 ${
        option.name.toUpperCase() === 'SIZE' ? 'order-2' : 'order-3'
      }`}
    >
      <p className="basis-12 shrink-0 grow-0 text-black">{option.name}</p>
      <div
        className={`flex flex-wrap w-full ${
          option.name.toUpperCase() === 'COLOUR'
            ? '-ml-2 -mt-3 md:max-w-[220px]'
            : '-ml-1 -mt-2'
        }`}
      >
        {option.values.map((value) => {
          const optionIndex = selectedVariant.selectedOptions.findIndex(
            (opt) => opt.name === option.name,
          );
          const selectedOptionValues = [
            ...selectedVariant.selectedOptions.slice(0, optionIndex),
            ...selectedVariant.selectedOptions.slice(optionIndex + 1),
            {
              name: option.name,
              value: value,
            },
          ]
            .map((opt) => opt.value)
            .sort();
          const variant = variants.product?.variants.nodes.find(
            (vt) =>
              JSON.stringify(
                vt.selectedOptions.map((opt) => opt.value).sort(),
              ) === JSON.stringify(selectedOptionValues),
          );
          if (!variant) return null;

          const isAvailable = variant.availableForSale;
          const isActive =
            selectedVariant.selectedOptions.find(
              (opt) => opt.name === option.name,
            )?.value === value;

          if (option.name.toUpperCase() === 'COLOUR') {
            const colorSvg = flattenConnection(colors.metaobjects).find(
              (color) =>
                color.name?.value?.toUpperCase() === value.toUpperCase(),
            )?.svg?.reference?.image;

            return (
              <div
                className={`text-xs md:text-sm w-7 h-7 cursor-pointer rounded-full border mt-3 ml-2 whitespace-nowrap relative ${
                  isActive ? 'p-[2px] border-noir' : 'border-[#eee] p-0'
                }`}
                aria-label={value}
                key={option.name + value}
                onClick={() => selectVariant(variant)}
              >
                {!isAvailable && (
                  <div className="w-full border-t border-noir rotate-45 absolute left-0 right-0 top-1/2"></div>
                )}
                {colorSvg && <Image data={colorSvg} sizes="28px" />}
              </div>
            );
          }
          return (
            <div
              className={`text-xs md:text-sm px-4 py-2 cursor-pointer rounded-full border border-noir mt-2 ml-1 whitespace-nowrap ${
                isActive ? 'bg-noir text-cream' : ''
              } ${!isAvailable ? 'opacity-30' : ''}`}
              key={option.name + value}
              onClick={() => selectVariant(variant)}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BundleDropdown = ({data}: {data: FaqItemFragment}) => {
  const [height, setHeight] = useState<0 | 'auto'>(0);

  return (
    <div className="py-3 border-b border-noir">
      <div
        className="relative"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        <p className="text-xs">{data.question?.value || ''}</p>
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[15px] border-t border-noir right-0 transition-transform duration-200 ${
            height === 'auto' ? 'rotate-180' : ''
          }`}
        ></div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-[15px] border-r border-noir right-[7px] transition-transform duration-200 ${
            height === 'auto' ? 'rotate-90' : ''
          }`}
        ></div>
      </div>
      <AnimateHeight height={height} duration={200}>
        <div className="mt-2">
          <p className="text-xs">{data.answer?.value}</p>
        </div>
      </AnimateHeight>
    </div>
  );
};
