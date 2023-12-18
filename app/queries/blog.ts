export const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blogs(first: 250) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
` as const;

export const ALL_ARTICLES_QUERY = `#graphql
  query AllArticles(
    $country: CountryCode,
    $language: LanguageCode,
    $first: Int,
    $last: Int,
    $startCursor: String,
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    articles(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        tags
        handle
        publishedAt
        image {
          url
          width
          height
          altText
        }
        blog {
          handle
          title
        }
      }
    }
  }
` as const;

export const BLOG_ARTICLES_QUERY = `#graphql
  query BlogByHandle(
    $country: CountryCode,
    $language: LanguageCode,
    $handle: String,
    $first: Int,
    $last: Int,
    $startCursor: String,
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    blog(handle: $handle) {
      title
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          id
          title
          handle
          publishedAt
          image {
            url
            width
            height
            altText
          }
          blog {
            handle
            title
          }
        }
      }
    }
  }
` as const;
