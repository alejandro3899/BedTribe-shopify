import {FAQ_ITEM_FRAGMENT} from './global';
import {PRODUCT_FEATURES_SLIDER_ITEM, PRODUCT_VARIANT_FRAGMENT} from './pdp';

export const BUNDLE_QUERY = `#graphql
  ${PRODUCT_VARIANT_FRAGMENT}
  ${FAQ_ITEM_FRAGMENT}
  ${PRODUCT_FEATURES_SLIDER_ITEM}
  fragment BundleProductItem on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
    options {
      id
      name
      values
    }
  }

  query Bundle (
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    metaobject(handle: {
      handle: $handle,
      type: "bundle"
    }) {
      title: field(key: "title") { value }
      discount_rate: field(key: "discount_rate") { value }
      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              id
              url
              width
              height
              altText
            }
          }
        }
      }
      products: field(key: "products") {
        references(first: 10) {
          edges {
            node {
              ...BundleProductItem
            }
          }
        }
      }
      dropdowns: field(key: "dropdown_items") {
        references(first: 10) {
          edges {
            node {
              ...FaqItem
            }
          }
        }
      }
      faqs: field(key: "fa_qs") {
        references(first: 10) {
          edges {
            node {
              ...FaqItem
            }
          }
        }
      }
      features: field(key: "features") {
        references(first: 10) {
          edges {
            node {
              ...ProductFeaturesSliderItem
            }
          }
        }
      }
    }
  }
` as const;
