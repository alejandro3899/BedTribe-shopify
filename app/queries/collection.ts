const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    tags
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

export const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters
        sortKey: $sortKey
        reverse: $reverse
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;

export const COLLECTIONS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "all-collections",
      type: "collections_all"
    }) {
      text: field(key: "text") { value }
      image: field(key: "image") {
        reference {
          ...on MediaImage {
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
      imageM: field(key: "image_mobile") {
        reference {
          ...on MediaImage {
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
      collections: field(key: "collections") {
        references(first: 100) {
          edges {
            node {
              ...on Collection {
                title
                handle
                products(first: 3) {
                  edges {
                    node {
                      ...ProductItem
                    }
                  }
                }
                gridImage: metafield(key: "grid_image", namespace: "custom") {
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        width
                        height
                        altText
                      }
                    }
                  }
                }
                gridImageSize: metafield(key: "grid_image_size", namespace: "custom") { value }
              }
            }
          }
        }
      }
    }
  }
` as const;
