import {useLoaderData, Link} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';

export async function loader({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="pt-28 md:pt-32 pb-10 md:pb-8">
      <div className="con">
        <h1 className="text-center">Collections</h1>
        <div className="mt-12 md:mt-10">
          <Pagination connection={collections}>
            {({nodes, isLoading, PreviousLink, NextLink}) => (
              <>
                <div className="mt-10 flex justify-center">
                  <PreviousLink className="button bg-transparent border border-noir">
                    {isLoading ? 'Loading...' : <span>Load previous</span>}
                  </PreviousLink>
                </div>
                <CollectionsGrid collections={nodes} />
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

function CollectionsGrid({collections}: {collections: CollectionFragment[]}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-8 md:gap-x-5 md:gap-y-12">
      {collections.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      <div
        className="pb-[100%] bg-cover cg-center"
        style={{backgroundImage: `url(${collection.image?.url || ''})`}}
      ></div>
      <p className="text-sm mt-[14px]">{collection.title}</p>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
