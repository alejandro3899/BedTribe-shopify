import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, NavLink} from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen';
import {BLOG_ARTICLES_QUERY, BLOGS_QUERY} from '~/queries/blog';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper/modules';
import ArticlesGrid from '~/components/blogs/ArticlesGrid';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.blog.title ?? ''} blog`}];
};

export const loader = async ({
  params,
  context: {storefront},
}: LoaderFunctionArgs) => {
  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  const {blogs} = await storefront.query(BLOGS_QUERY);
  const {blog} = await storefront.query(BLOG_ARTICLES_QUERY, {
    variables: {handle: params.blogHandle},
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return json({blog, blogs});
};

export default function Blog() {
  const {blog, blogs} = useLoaderData<typeof loader>();
  const {articles} = blog;

  return (
    <div className="con pt-28 md:pt-32 pb-20 md:pb-16">
      <h1>{blog.title}</h1>
      <div className="mt-5 md:mt-6">
        <div className="space-x-1 hidden md:flex">
          <NavLink
            to="/blogs/all"
            className={({isActive}) =>
              `blog-category ${isActive ? 'active bg-black text-white' : ''}`
            }
          >
            All Categories
          </NavLink>
          {flattenConnection(blogs).map((blog) => (
            <NavLink
              key={blog.id}
              to={`/blogs/${blog.handle}`}
              className={({isActive}) =>
                `blog-category ${isActive ? 'active bg-black text-white' : ''}`
              }
            >
              {blog.title}
            </NavLink>
          ))}
        </div>
        <Swiper
          spaceBetween={4}
          slidesPerView="auto"
          freeMode={true}
          modules={[FreeMode]}
          className="md:!hidden [&_.swiper-slide]:w-fit"
        >
          <SwiperSlide>
            <NavLink
              to="/blogs/all"
              className={({isActive}) =>
                `blog-category ${isActive ? 'active bg-black text-white' : ''}`
              }
            >
              All Categories
            </NavLink>
          </SwiperSlide>
          {flattenConnection(blogs).map((blog) => (
            <SwiperSlide key={blog.id}>
              <NavLink
                to={`/blogs/${blog.handle}`}
                className={({isActive}) =>
                  `blog-category ${
                    isActive ? 'active bg-black text-white' : ''
                  }`
                }
              >
                {blog.title}
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-14 md:mt-20">
        <ArticlesGrid articles={flattenConnection(articles)} />
      </div>
    </div>
  );
}

// // NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
// const BLOGS_QUERY = `#graphql
//   query Blog(
//     $language: LanguageCode
//     $blogHandle: String!
//     $first: Int
//     $last: Int
//     $startCursor: String
//     $endCursor: String
//   ) @inContext(language: $language) {
//     blog(handle: $blogHandle) {
//       title
//       seo {
//         title
//         description
//       }
//       articles(
//         first: $first,
//         last: $last,
//         before: $startCursor,
//         after: $endCursor
//       ) {
//         nodes {
//           ...ArticleItem
//         }
//         pageInfo {
//           hasPreviousPage
//           hasNextPage
//           hasNextPage
//           endCursor
//           startCursor
//         }

//       }
//     }
//   }
//   fragment ArticleItem on Article {
//     author: authorV2 {
//       name
//     }
//     contentHtml
//     handle
//     id
//     image {
//       id
//       altText
//       url
//       width
//       height
//     }
//     publishedAt
//     title
//     blog {
//       handle
//     }
//   }
// ` as const;
