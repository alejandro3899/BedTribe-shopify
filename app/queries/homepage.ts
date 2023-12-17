import {
  FEATURED_PRODUCT_ITEM_FRAGMENT,
  HERO_ITEM_FRAGMENT,
  INTRO_ITEM_FRAGMENT,
  PRODUCT_CARD_ITEM_FRAGMENT,
} from './global';

export const HOMEPAGE_HERO = `#graphql
  ${HERO_ITEM_FRAGMENT}
  query HomepageHero (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "homepage-hero",
      type: "homepage_hero"
    }) {
      ... HeroItem
    }
  }
` as const;

export const HOMEPAGE_INTRO = `#graphql
  ${INTRO_ITEM_FRAGMENT}
  query HomepageIntro (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
      metaobject(handle: {
        handle: "homepage-intro",
        type: "homepage_intro"
      }) {
        ... IntroItem
      }
  }
` as const;

export const HOMEPAGE_FEATURED_PRDOUCT = `#graphql
  ${PRODUCT_CARD_ITEM_FRAGMENT}
  ${FEATURED_PRODUCT_ITEM_FRAGMENT}
  query HomepageFeaturedProduct(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "homepage-featured-product",
      type: "homepage_featured_product"
    }) {
      ... FeaturedProductItem
    }
  }
` as const;

export const HOMEPAGE_LOGOS = `#graphql
  query HomepageLogos(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "homepage-logos",
      type: "homepage_logos"
    }) {
      logos: field(key: "logos") {
        references(first: 25) {
          edges {
            node {
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

export const HOMEPAGE_BANNER = `#graphql
  query HomepageBanner(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "homepage-banner",
      type: "homepage_banner"
    }) {
      title: field(key: "title") { value }
      subtitle: field(key: "subtitle") { value }
      btnLabel: field(key: "button_label") { value }
      btnLink: field(key: "button_link") { value }
      imageD: field(key: "image_desktop") {
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
      imageM: field(key: "image_mobile") {
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

export const HOMEPAGE_PRESSES = `#graphql
  fragment HomepagePressItem on Metaobject {
    desc: field(key: "description"){ value }
    image: field(key: "image") {
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

  query HomepagePresses (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "our-bamboo-sheets",
      type: "homepage_presses"
    }) {
      title: field(key: "title") { value }
      presses: field(key: "presses") {
        references(first: 3) {
          edges {
            node {
              ...HomepagePressItem
            }
          }
        }
      }
    }
  }
` as const;

export const HOMEPAGE_USPS = `#graphql
  ${PRODUCT_CARD_ITEM_FRAGMENT}
  fragment HomepageUSPItem on Metaobject {
    tab: field(key: "tab") { value }
    product: field(key: "product") {
      reference {
        ... ProductCardItem
      }
    }
  }

  query HomepageUSPs (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "sleep-just-the-way-you-like-it",
      type: "homepage_usp"
    }) {
      title: field(key: "title") { value }
      image: field(key: "image") {
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
      items: field(key: "items") {
        references (first: 10) {
          edges {
            node {
              ...HomepageUSPItem
            }
          }
        }
      }
    }
  }
` as const;

export const HOMEPAGE_REVIEW = `#graphql
    query HomepageReview (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "andy-kong",
      type: "homepage_review"
    }) {
      name: field(key: "name") { value }
      review: field(key: "review") { value }
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

export const HOMEPAGE_PROMISES = `#graphql
  fragment HomepagePromiseItem on Metaobject {
    id
    text: field(key: "text") { value }
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

  query HomepagePromises (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle:  {
      handle: "homepage-promises-u3hdyyfb",
      type: "homepage_promises"
    }) {
      promises: field(key: "promises") {
        references(first: 10) {
          edges {
            node {
              ...HomepagePromiseItem
            }
          }
        }
      }
    }
  }
` as const;

export const HOMEPAGE_TIKTOKS = `#graphql
  fragment HomepageTiktokItem on Metaobject {
    id
    username: field(key: "username") { value }
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

  query HomepageTiktoks (
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "homepage-tiktok-ylioxuan",
      type: "homepage_tiktok"
    }) {
      items: field(key: "items") {
        references(first: 25) {
          edges {
            node {
              ...HomepageTiktokItem
            }
          }
        }
      }
    }
  }
` as const;
