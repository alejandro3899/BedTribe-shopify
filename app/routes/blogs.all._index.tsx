import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Link,
  useLoaderData,
  type MetaFunction,
  NavLink,
  useNavigate,
} from '@remix-run/react';
import {flattenConnection, Image} from '@shopify/hydrogen';
import {ALL_ARTICLES_QUERY, BLOGS_QUERY} from '~/queries/blog';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper/modules';
import ArticlesGrid from '~/components/blogs/ArticlesGrid';

export const meta: MetaFunction = () => {
  return [{title: `Bedtribe Magazine`}];
};

export const loader = async ({context: {storefront}}: LoaderFunctionArgs) => {
  const {blogs} = await storefront.query(BLOGS_QUERY);
  const {articles} = await storefront.query(ALL_ARTICLES_QUERY);

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
            to="/blogs/all"
            className={({isActive}) =>
              `blog-category ${isActive ? 'active bg-black text-white' : ''}`
            }
          >
            All Categories
          </NavLink>
          {flattenConnection(blogs).map((blog) => (
            <NavLink
              key={blog.handle}
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
