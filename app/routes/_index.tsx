import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Await} from '@remix-run/react';
import {
  HOMEPAGE_BANNER,
  HOMEPAGE_FEATURED_PRDOUCT,
  HOMEPAGE_HERO,
  HOMEPAGE_INTRO,
  HOMEPAGE_LOGOS,
  HOMEPAGE_PRESSES,
  HOMEPAGE_PROMISES,
  HOMEPAGE_REVIEW,
  HOMEPAGE_TIKTOKS,
  HOMEPAGE_USPS,
} from '~/queries/homepage';
import HomepageHero from '~/components/homepage/HomepageHero';
import {Suspense} from 'react';
import HomepageIntro from '~/components/homepage/HomepageIntro';
import HomepageFeaturedProduct from '~/components/homepage/HomepageFeaturedProduct';
import HomepageLogos from '~/components/homepage/HomepageLogos';
import HomepageBanner from '~/components/homepage/HomepageBanner';
import HomepagePresses from '~/components/homepage/HomepagePresses';
import HomepageReview from '~/components/homepage/HomepageReview';
import HomepagePromises from '~/components/homepage/HomepagePromises';
import HomepageTiktok from '~/components/homepage/HomepageTiktok';
import joinClub from '~/assets/join.svg';
import joinClubM from '~/assets/join-m.svg';

export const meta: MetaFunction = () => {
  return [{title: 'Bedtribe | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const hero = await storefront.query(HOMEPAGE_HERO);
  const introPromise = storefront.query(HOMEPAGE_INTRO);
  const featuredProductPromise = storefront.query(HOMEPAGE_FEATURED_PRDOUCT);
  const logosPromise = storefront.query(HOMEPAGE_LOGOS);
  const bannerPromise = storefront.query(HOMEPAGE_BANNER);
  const pressesPromise = storefront.query(HOMEPAGE_PRESSES);
  const uspPromise = storefront.query(HOMEPAGE_USPS);
  const reviewPromise = storefront.query(HOMEPAGE_REVIEW);
  const promisesPromise = storefront.query(HOMEPAGE_PROMISES);
  const tiktoksPromise = storefront.query(HOMEPAGE_TIKTOKS);

  return defer({
    hero,
    introPromise,
    featuredProductPromise,
    logosPromise,
    bannerPromise,
    pressesPromise,
    uspPromise,
    reviewPromise,
    promisesPromise,
    tiktoksPromise,
  });
}

export default function Homepage() {
  const {
    hero,
    introPromise,
    featuredProductPromise,
    logosPromise,
    bannerPromise,
    pressesPromise,
    uspPromise,
    reviewPromise,
    promisesPromise,
    tiktoksPromise,
  } = useLoaderData<typeof loader>();

  return (
    <>
      {hero && <HomepageHero data={hero} />}
      {introPromise && (
        <Suspense>
          <Await resolve={introPromise}>
            {(intro) => <HomepageIntro data={intro} />}
          </Await>
        </Suspense>
      )}
      {featuredProductPromise && (
        <Suspense>
          <Await resolve={featuredProductPromise}>
            {(featureProduct) => (
              <HomepageFeaturedProduct data={featureProduct} />
            )}
          </Await>
        </Suspense>
      )}
      {logosPromise && (
        <Suspense>
          <Await resolve={logosPromise}>
            {(logos) => <HomepageLogos data={logos} />}
          </Await>
        </Suspense>
      )}
      {bannerPromise && (
        <Suspense>
          <Await resolve={bannerPromise}>
            {(banner) => <HomepageBanner data={banner} />}
          </Await>
        </Suspense>
      )}
      {pressesPromise && (
        <Suspense>
          <Await resolve={pressesPromise}>
            {(presses) => <HomepagePresses data={presses} />}
          </Await>
        </Suspense>
      )}
      {uspPromise && (
        <Suspense>
          <Await resolve={uspPromise}>{(usps) => <></>}</Await>
        </Suspense>
      )}
      {reviewPromise && (
        <Suspense>
          <Await resolve={reviewPromise}>
            {(review) => <HomepageReview data={review} />}
          </Await>
        </Suspense>
      )}
      {promisesPromise && (
        <Suspense>
          <Await resolve={promisesPromise}>
            {(promises) => <HomepagePromises data={promises} />}
          </Await>
        </Suspense>
      )}
      <div className="pt-8 con">
        <div className="relative">
          <img
            src={joinClub}
            alt="join vector"
            className="hidden w-full md:block"
          />
          <img
            src={joinClubM}
            alt="join vector"
            className="block w-full md:hidden"
          />
        </div>
      </div>
      {tiktoksPromise && (
        <Suspense>
          <Await resolve={tiktoksPromise}>
            {(tiktoks) => <HomepageTiktok data={tiktoks} />}
          </Await>
        </Suspense>
      )}
    </>
  );
}

// function FeaturedCollection({
//   collection,
// }: {
//   collection: FeaturedCollectionFragment;
// }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery>;
// }) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {({products}) => (
//             <div className="recommended-products-grid">
//               {products.nodes.map((product) => (
//                 <Link
//                   key={product.id}
//                   className="recommended-product"
//                   to={`/products/${product.handle}`}
//                 >
//                   <Image
//                     data={product.images.nodes[0]}
//                     aspectRatio="1/1"
//                     sizes="(min-width: 45em) 20vw, 50vw"
//                   />
//                   <h4>{product.title}</h4>
//                   <small>
//                     <Money data={product.priceRange.minVariantPrice} />
//                   </small>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }

// const FEATURED_COLLECTION_QUERY = `#graphql
//   fragment FeaturedCollection on Collection {
//     id
//     title
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query FeaturedCollection($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...FeaturedCollection
//       }
//     }
//   }
// ` as const;

// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     images(first: 1) {
//       nodes {
//         id
//         url
//         altText
//         width
//         height
//       }
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// ` as const;
