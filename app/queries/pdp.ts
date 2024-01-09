import {PRODUCT_ITEM_FRAGMENT} from './collection';
import {FAQ_ITEM_FRAGMENT} from './global';

export const COLORS_QUERY = `#graphql
  query Colors(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobjects(first: 250, type: "global_colors_list") {
      edges {
        node {
          id
          name: field(key: "color_name") { value },
          svg: field(key: "svg") {
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
        }
      }
    }
  }
` as const;

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

export const PRODUCT_FEATURES_SLIDER_ITEM = `#graphql
  fragment ProductFeaturesSliderItem on Metaobject {
    id
    title: field(key: "title") { value }
    desc: field(key: "description") { value }
    image: field(key: "slider_image") {
      reference {
        ... on MediaImage {
          image  {
            url
            width
            height
            url
          }
        }
      }
    }
    image_m: field(key: "slider_image_mobile") {
      reference {
        ... on MediaImage {
          image  {
            url
            width
            height
            url
          }
        }
      }
    }
    details_image_1: field(key: "details_image_1") {
      reference {
        ... on MediaImage {
          image  {
            url
            width
            height
            url
          }
        }
      }
    }
    details_image_2: field(key: "detail_image_2") {
      reference {
        ... on MediaImage {
          image  {
            url
            width
            height
            url
          }
        }
      }
    }
  }
` as const;
const PRODUCT_FRAGMENT = `#graphql
  fragment ProductPropertyItem on Metaobject {
    id
    title: field(key: "title") { value }
    desc: field(key: "description") { value }
    image: field(key: "image") {
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
  }

  fragment ProductLearnMoreItem on Metaobject {
    id
    title: field(key: "title") { value }
    desc: field(key: "description") { value }
  }

  fragment ProductUSPItem on Metaobject {
    id
    title: field(key: "title") { value }
    desc: field(key: "description") { value }
    icon: field(key: "icon") {
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
  }

  fragment ProductUSP on Metaobject {
    title: field(key: "title") { value }
    desc: field(key: "description") { value }
    image: field(key: "image") {
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
    uspItems: field(key: "usp_items") {
      references(first: 4) {
        edges {
          node {
            ...ProductUSPItem
          }
        }
      }
    }
  }

  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    properties: metafield(key: "properties", namespace: "custom") {
      references(first: 3) {
        edges {
          node {
            ...ProductPropertyItem
          }
        }
      }
    }
    featuresSlider: metafield(key: "features_slider", namespace: "custom") {
      references(first: 10) {
        edges {
          node {
            ...ProductFeaturesSliderItem
          }
        }
      }
    }
    usp: metafield(key: "usp", namespace: "custom") {
      reference {
        ...ProductUSP
      }
    }
    faqs: metafield(key: "faqs", namespace: "custom") {
      references(first: 10) {
        edges {
          node {
            ...FaqItem
          }
        }
      }
    }
    learn_more: metafield(key: "learn_more_items", namespace: "custom") {
      references(first: 10) {
        edges {
          node {
            ...ProductLearnMoreItem
          }
        }
      }
    }
    learn_more_title: metafield(key: "learn_more_title", namespace: "custom") { value }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
  ${FAQ_ITEM_FRAGMENT}
` as const;

export const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_FEATURES_SLIDER_ITEM}
` as const;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;

export const PRODUCT_COMMUNITY = `#graphql
  query ProductCommunity(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "check-out-our-community",
      type: "pdp_community"
    }) {
      left_title: field(key: "left_title") { value }
      left_url: field(key: "left_url") { value }
      image: field(key: "image") {
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
      right_title: field(key: "right_title") { value }
      right_url: field(key: "right_url") { value }
    }
  }
` as const;

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query RecommendedProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 10, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          ...ProductItem
        }
      }
    }
  }
` as const;
