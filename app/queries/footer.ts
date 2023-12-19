export const FOOTER_QUERY = `#graphql
  fragment SocialLinkItem on Metaobject {
    id
    title: field(key: "title") { value }
    url: field(key: "url") { value}
  }

  query Footer(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      handle: "footer",
      type: "footer"
    }) {
      desc: field(key: "description") { value }
      marqueeTexts: field(key: "marquee_texts") { value }
      socialLinks: field(key: "social_links") {
        references (first: 10) {
          edges {
            node {
              ...SocialLinkItem
            }
          }
        }
      }
    }
  }
` as const;
