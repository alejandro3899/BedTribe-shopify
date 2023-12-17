import {Image} from '@shopify/hydrogen';
import {HomepageIntroQuery} from 'storefrontapi.generated';

export default function HomepageIntro({data}: {data: HomepageIntroQuery}) {
  const introData = data.metaobject;
  if (!introData) return null;
  return (
    <div className="con py-9 md:py-10">
      <h1 className="text-black whitespace-pre-wrap">
        {introData.title?.value || ''}
      </h1>
      <div className="mt-8 flex space-x-5 md:space-x-10">
        <p className="small max-w-[95px] md:max-w-none">
          {introData.subtitle1?.value || ''}
        </p>
        <p className="small max-w-[95px] md:max-w-none">
          {introData.subtitle2?.value || ''}
        </p>
      </div>
      <div className="mt-20 md:mt-13 flex justify-end">
        <div className="w-56 md:w-[450px]">
          {introData.image?.reference?.image && (
            <Image
              data={introData.image.reference.image}
              sizes="(min-width: 768px) 230px, 450px"
            />
          )}
        </div>
      </div>
    </div>
  );
}
