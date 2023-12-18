import {Image} from '@shopify/hydrogen';
import {AboutDescription2Query} from 'storefrontapi.generated';

export default function AboutDesc2({data}: {data: AboutDescription2Query}) {
  if (!data.metaobject) return null;
  return (
    <div className="con">
      <div className="pt-7 md:pt-16 pb-20 md:pb-40">
        {data.metaobject.image?.reference?.image && (
          <Image
            data={data.metaobject.image.reference.image}
            alt="about3"
            className="rounded-lg"
          />
        )}

        <div className="max-w-[237px] md:max-w-[454px] mx-auto mt-8 md:mt-20">
          <h1 className="mb-2 md:mb-7">{data.metaobject.title?.value || ''}</h1>

          <p className="whitespace-pre-wrap">{data.metaobject.desc?.value}</p>
        </div>
      </div>
    </div>
  );
}
