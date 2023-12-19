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

export const ARTICLE_FRAGMENT = `#graphql
  fragment ArticleItem on Article {
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
` as const;

export const ALL_ARTICLES_QUERY = `#graphql
  ${ARTICLE_FRAGMENT}
  query AllArticles(
    $country: CountryCode,
    $language: LanguageCode,
  ) @inContext(country: $country, language: $language) {
    articles(first: 250) {
      edges {
        node {
          ...ArticleItem
        }
      }
    }
  }
` as const;

export const BLOG_ARTICLES_QUERY = `#graphql
  ${ARTICLE_FRAGMENT}
  query BlogByHandle(
    $country: CountryCode,
    $language: LanguageCode,
    $handle: String
  ) @inContext(country: $country, language: $language) {
    blog(handle: $handle) {
      title
      articles(first: 250) {
        nodes {
          ...ArticleItem
        }
      }
    }
  }
` as const;
