import {
  FAQ_ITEM_FRAGMENT,
  FEATURED_PRODUCT_ITEM_FRAGMENT,
  HERO_ITEM_FRAGMENT,
  INTRO_ITEM_FRAGMENT,
  PRODUCT_CARD_ITEM_FRAGMENT,
} from './global';

export const ABOUT_HERO = `#graphql
  ${HERO_ITEM_FRAGMENT}
  query AboutHero (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "about-hero",
      type: "homepage_hero"
    }) {
      ... HeroItem
    }
  }
` as const;

export const ABOUT_INTRO = `#graphql
  ${INTRO_ITEM_FRAGMENT}
  query AboutIntro (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
      metaobject(handle: {
        handle: "about-intro",
        type: "homepage_intro"
      }) {
        ... IntroItem
      }
  }
` as const;

export const ABOUT_FEATURED_PRDOUCT = `#graphql
  ${PRODUCT_CARD_ITEM_FRAGMENT}
  ${FEATURED_PRODUCT_ITEM_FRAGMENT}
  query AboutFeaturedProduct(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "about-featured-product",
      type: "homepage_featured_product"
    }) {
      ... FeaturedProductItem
    }
  }
` as const;

export const ABOUT_DESCRIPTION_1 = `#graphql
  query AboutDescription1(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "about-description-1",
      type: "about_description_1"
    }) {
      desc: field(key: "description") { value }
      image1: field(key: "image_1") {
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
      image2: field(key: "image_2") {
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
    }
  }
` as const;

export const ABOUT_DESCRIPTION_2 = `#graphql
  query AboutDescription2(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "about-description-2",
      type: "about_description_2"
    }) {
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
  }
` as const;

export const ABOUT_FAQS = `#graphql
  ${FAQ_ITEM_FRAGMENT}
  query AboutFaqs(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "about-faqs",
      type: "about_fa_qs"
    }) {
      items: field(key: "items") {
        references(first: 10) {
          edges {
            node {
              ...FaqItem
            }
          }
        }
      }
    }
  }
` as const;
