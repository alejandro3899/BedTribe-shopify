export const HERO_ITEM_FRAGMENT = `#graphql
  fragment HeroItem on Metaobject {
    title: field(key: "title") { value }
    link: field(key: "link") { value }
    imageD: field(key: "image") {
      reference {
        ... on MediaImage {
          image {
            width
            height
            altText
            url
          }
        }
      }
    }
    imageM: field(key: "image_mobile") {
      reference {
        ... on MediaImage {
          image {
            width
            height
            url
            altText
          }
        }
      }
    }
  }
` as const;

export const INTRO_ITEM_FRAGMENT = `#graphql
  fragment IntroItem on Metaobject {
    title: field(key: "title") { value }
    subtitle1: field(key: "subtitle_1") { value }
    subtitle2: field(key: "subtitle_2") { value }
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
` as const;

export const FEATURED_PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment FeaturedProductItem on Metaobject {
    title: field(key: "title") { value }
    subtitle: field(key: "subtitle") { value }
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
    product: field(key: "product") {
      reference {
        ... ProductCardItem
      }
    }
  }
` as const;

export const PRODUCT_CARD_ITEM_FRAGMENT = `#graphql
  fragment ProductCardItem on Product {
    title
    featuredImage {
      url
      width
      height
      altText
    }
    variants(first: 25) {
      edges {
        node {
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
` as const;

export const FAQ_ITEM_FRAGMENT = `#graphql
  fragment FaqItem on Metaobject {
    id
    question: field(key: "question") { value }
    answer: field(key: "answer") { value }
  }
` as const;
