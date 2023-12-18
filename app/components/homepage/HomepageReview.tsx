import {Image} from '@shopify/hydrogen';
import {HomepageReviewQuery} from 'storefrontapi.generated';

export default function HomepageReview({data}: {data: HomepageReviewQuery}) {
  if (!data.metaobject) return null;

  return (
    <div className="con">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-8/12">
          {data.metaobject.image?.reference?.image && (
            <Image
              data={data.metaobject.image.reference.image}
              alt="homepage review"
              className="rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg"
            />
          )}
        </div>
        <div className="bg-cream w-full md:w-4/12 py-6 md:pt-10 lg:pt-20 md:pb-14 pl-6 pr-9 md:px-8 lg:px-[60px] flex flex-wrap content-between gap-40 md:gap-0 rounded-br-lg rounded-bl-lg md:rounded-tr-lg md:rounded-bl-none">
          <h5>{data.metaobject.review?.value || ''}</h5>
          <p className="text-20 leading-none">
            {data.metaobject.name?.value || ''}
          </p>
        </div>
      </div>
    </div>
  );
}
