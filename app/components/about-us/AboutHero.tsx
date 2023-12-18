import {Image} from '@shopify/hydrogen';
import {AboutHeroQuery} from 'storefrontapi.generated';

export default function AboutHero({data}: {data: AboutHeroQuery}) {
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
        <div className="w-full h-full flex justify-start items-center px-9 md:px-12 ">
          <h1 className="text-cream whitespace-pre-wrap max-w-[270px] md:max-w-[692px]">
            {heroData.title?.value || ''}
          </h1>
        </div>
      </div>
    </div>
  );
}
