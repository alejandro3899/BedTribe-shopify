import {Image} from '@shopify/hydrogen';
import {AboutDescription1Query} from 'storefrontapi.generated';

export default function AboutDesc1({data}: {data: AboutDescription1Query}) {
  if (!data.metaobject) return null;

  return (
    <div className="con">
      <div className="pt-14 pb-7 md:pt-16 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-16">
          <div>
            {data.metaobject.image1?.reference?.image && (
              <Image
                data={data.metaobject.image1.reference.image}
                alt="about desc1 first"
                className="rounded-lg"
              />
            )}
            <h3 className="mt-3 md:mt-5">
              {data.metaobject.desc?.value || ''}
            </h3>
          </div>
          <div>
            <div className="w-full flex justify-end md:justify-start">
              {data.metaobject.image2?.reference?.image && (
                <Image
                  data={data.metaobject.image2.reference.image}
                  alt="about desc1 second"
                  className="w-9/12 md:max-w-[453px] rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
