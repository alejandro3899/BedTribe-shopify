import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Link,
  useLoaderData,
  type MetaFunction,
  NavLink,
} from '@remix-run/react';
import {
  Pagination,
  flattenConnection,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {ALL_ARTICLES_QUERY, BLOGS_QUERY} from '~/queries/blog';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper/modules';

export const meta: MetaFunction = () => {
  return [{title: `Bedtribe Magazine`}];
};

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 7,
  });

  const {blogs} = await storefront.query(BLOGS_QUERY);

  const {articles} = await storefront.query(ALL_ARTICLES_QUERY, {
    variables: {
      ...paginationVariables,
    },
  });

  return json({blogs, articles});
};

export default function Blogs() {
  const {blogs, articles} = useLoaderData<typeof loader>();

  return (
    <div className="con pt-28 md:pt-32 pb-20 md:pb-16">
      <h1>The Bedtribe Magazine</h1>
      <div className="mt-5 md:mt-6">
        <div className="space-x-1 hidden md:flex">
          <NavLink
            to="/blogs"
            className={({isActive}) =>
              `blog-category ${isActive ? 'active bg-black text-white' : ''}`
            }
          >
            All Categories
          </NavLink>
          {flattenConnection(blogs).map((blog) => (
            <NavLink
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
              to="/blogs"
              className={({isActive}) =>
                `blog-category ${isActive ? 'active bg-black text-white' : ''}`
              }
            >
              All Categories
            </NavLink>
          </SwiperSlide>
          {flattenConnection(blogs).map((blog) => (
            <SwiperSlide>
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
        <Pagination connection={articles}>
          {({nodes, isLoading, PreviousLink, NextLink}) => {
            return (
              <>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-16">
                  {nodes.map((article) => {
                    const publishedDate = new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(article.publishedAt));

                    return (
                      <Link
                        key={article.handle}
                        prefetch="intent"
                        to={`/blogs/${article.blog.handle}/${article.handle}`}
                      >
                        <div
                          className="pb-[70%] rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${article.image?.url})`,
                          }}
                        ></div>
                        <p className="article-title mt-3">{article.title}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="small h-3">{publishedDate}</p>
                          <div className="w-1 h-1 bg-zap rounded-full"></div>
                          <p className="small h-3">{article.blog.title}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex justify-center mt-12 md:mt-10">
                  <NextLink>
                    {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                  </NextLink>
                </div>
              </>
            );
          }}
        </Pagination>
      </div>
    </div>
  );
}

// const BLOGS_QUERY = `#graphql
//   query Blogs(
//     $country: CountryCode
//     $endCursor: String
//     $first: Int
//     $language: LanguageCode
//     $last: Int
//     $startCursor: String
//   ) @inContext(country: $country, language: $language) {
//     blogs(
//       first: $first,
//       last: $last,
//       before: $startCursor,
//       after: $endCursor
//     ) {
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//       nodes {
//         title
//         handle
//         seo {
//           title
//           description
//         }
//       }
//     }
//   }
// ` as const;
