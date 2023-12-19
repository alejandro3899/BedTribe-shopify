export const CONTACT_FORM_QUERY = `#graphql
  query ContactForm(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(handle: {
      type: "contact_form",
      handle: "contact-form"
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
      image_m: field(key: "image_mobile") {
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
      desc: field(key: "description") { value }
      subjects: field(key: "subjects") { value }
    }
  }
` as const;
