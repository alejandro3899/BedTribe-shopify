import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/utils';
import {COLLECTION_QUERY} from '~/queries/collection';
import CollectionSort from '~/components/collection/CollectionSort';
import CollectionFilter from '~/components/collection/CollectionFilter';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Bedtribe | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const searchParams = new URL(request.url).searchParams;

  const sortKey = searchParams.get('sortBy');
  const sortDir = searchParams.get('sortDir');
  const available = searchParams.get('available');

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    return redirect('/collections');
  }

  let variables: object = {};
  if (available) {
    variables = {
      ...variables,
      filters: {available: true},
    };
  }

  if (sortKey === 'price') {
    if (sortDir === 'asc')
      variables = {
        ...variables,
        sortKey: 'PRICE',
      };
    if (sortDir === 'desc')
      variables = {
        ...variables,
        sortKey: 'PRICE',
        reverse: true,
      };
  }

  if (sortKey === 'createdAt') {
    variables = {
      ...variables,
      sortKey: 'CREATED',
      reverse: true,
    };
  }

  let sort = '';
  if (sortKey === 'createdAt') sort = 'newest';
  if (sortKey === 'price' && sortDir === 'asc') sort = 'asc';
  if (sortKey === 'price' && sortDir === 'desc') sort = 'desc';

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables, ...variables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection, sort, available});
}

export default function Collection() {
  const {collection, sort, available} = useLoaderData<typeof loader>();

  return (
    <div className="pt-28 md:pt-32 pb-10 md:pb-8">
      <div className="con">
        <h1 className="text-center">{collection.title}</h1>
        <div className="mt-8 md:mt-2 flex justify-between items-center">
          <CollectionFilter available={available} />
          <CollectionSort selected={sort} />
        </div>
        <div className="mt-12 md:mt-10">
          <Pagination connection={collection.products}>
            {({nodes, isLoading, PreviousLink, NextLink}) => (
              <>
                <div className="mt-10 flex justify-center">
                  <PreviousLink className="button bg-transparent border border-noir">
                    {isLoading ? 'Loading...' : <span>Load previous</span>}
                  </PreviousLink>
                </div>
                <ProductsGrid products={nodes} />
                <div className="mt-10 flex justify-center">
                  <NextLink className="button bg-transparent border border-noir">
                    {isLoading ? 'Loading...' : <span>Load more</span>}
                  </NextLink>
                </div>
              </>
            )}
          </Pagination>
        </div>
      </div>
    </div>
  );
}

function ProductsGrid({products}: {products: ProductItemFragment[]}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-8 md:gap-x-4 md:gap-y-10 ">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div
        className="pb-[116%] md:pb-[100%] bg-contain bg-no-repeat bg-center rounded-lg bg-product-card"
        style={{backgroundImage: `url(${product.featuredImage?.url || ''})`}}
      ></div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <p className="text-sm mt-[14px]">{product.title}</p>
          <small className="mt-1">
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        </div>
        <div></div>
      </div>
    </Link>
  );
}
