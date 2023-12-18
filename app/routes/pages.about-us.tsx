import {type LoaderFunctionArgs, defer} from '@remix-run/server-runtime';
import about3 from '../assets/about3.png';
import {
  ABOUT_DESCRIPTION_1,
  ABOUT_DESCRIPTION_2,
  ABOUT_FAQS,
  ABOUT_FEATURED_PRDOUCT,
  ABOUT_HERO,
  ABOUT_INTRO,
} from '~/queries/about-us';
import {MetaFunction} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import AboutHero from '~/components/about-us/AboutHero';
import {Suspense} from 'react';
import AboutDesc1 from '~/components/about-us/AboutDesc1';
import AboutIntro from '~/components/about-us/AboutIntro';
import AboutDesc2 from '~/components/about-us/AboutDesc2';
import AboutFaqs from '~/components/about-us/AboutFaqs';
import AboutFeaturedProduct from '~/components/about-us/AboutFeaturedProduct';

export const meta: MetaFunction = () => {
  return [{title: 'Bedtribe | About Us'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const hero = await storefront.query(ABOUT_HERO);
  const introPromise = storefront.query(ABOUT_INTRO);
  const desc1Promise = storefront.query(ABOUT_DESCRIPTION_1);
  const desc2Promise = storefront.query(ABOUT_DESCRIPTION_2);
  const featuredProductPromise = storefront.query(ABOUT_FEATURED_PRDOUCT);
  const faqsPromise = storefront.query(ABOUT_FAQS);

  return defer({
    hero,
    introPromise,
    desc1Promise,
    desc2Promise,
    featuredProductPromise,
    faqsPromise,
  });
}

export default function About() {
  const {
    hero,
    introPromise,
    desc1Promise,
    desc2Promise,
    featuredProductPromise,
    faqsPromise,
  } = useLoaderData<typeof loader>();

  return (
    <>
      {hero && <AboutHero data={hero} />}
      <Suspense>
        <Await resolve={introPromise}>
          {(intro) => <AboutIntro data={intro} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={desc1Promise}>
          {(desc1) => <AboutDesc1 data={desc1} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={desc2Promise}>
          {(desc2) => <AboutDesc2 data={desc2} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={featuredProductPromise}>
          {(featuredProduct) => <AboutFeaturedProduct data={featuredProduct} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={faqsPromise}>
          {(faqs) => <AboutFaqs data={faqs} />}
        </Await>
      </Suspense>
    </>
  );
}
