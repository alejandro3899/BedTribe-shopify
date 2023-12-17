import {Image} from '@shopify/hydrogen';
import {HomepageHeroQuery} from 'storefrontapi.generated';

export default function HomepageHero({data}: {data: HomepageHeroQuery}) {
  const heroData = data.metaobject;
  if (!heroData) return null;

  return (
    <div className="h-screen relative rounded-lg overflow-hidden">
      {heroData.imageD?.reference?.image && (
        <Image
          data={heroData.imageD.reference.image}
          sizes="100vw"
          className="hidden md:block w-full h-full object-cover object-center"
        />
      )}
      {heroData.imageM?.reference?.image && (
        <Image
          data={heroData.imageM.reference.image}
          sizes="100vw"
          className="block md:hidden w-full h-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0">
        <div className="w-full h-full flex justify-center items-center">
          <p className="display-l text-center text-cream whitespace-pre-wrap">
            {heroData.title?.value || ''}
          </p>
        </div>
      </div>
    </div>
  );
}
