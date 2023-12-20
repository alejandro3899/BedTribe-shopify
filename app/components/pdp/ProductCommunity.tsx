import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {ProductCommunityQuery} from 'storefrontapi.generated';
import arrowRight from '~/assets/right-arrow.svg';

export default function ProductCommunity({
  data,
}: {
  data: ProductCommunityQuery;
}) {
  return (
    <div className="py-5">
      <div className="con">
        <div className="h-[710px] md:h-[540px] flex flex-wrap">
          <div className="w-full md:w-7/12 relative">
            {data.metaobject?.image?.reference?.image && (
              <Image
                data={data.metaobject.image.reference.image}
                className="w-full h-full object-cover object-center rounded-lg"
              />
            )}
            <div className="absolute inset-0 p-7">
              <div className="h-full flex flex-col justify-between items-stretch">
                <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
                  <h3 className="text-cream mt-3 md:mt-0">
                    {data.metaobject?.left_title?.value || ''}
                  </h3>
                  <Link
                    to="/blogs/all"
                    className="button px-4 py-2 normal-case border border-cream bg-transparent font-sans text-11 md:text-20 !leading-none text-cream"
                  >
                    Magazine
                  </Link>
                </div>
                <div className="flex justify-end">
                  <Link
                    to={data.metaobject?.left_url?.value || ''}
                    className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] p-3 md:p-4 rounded-full bg-cream"
                  >
                    <img src={arrowRight} className="w-full h-full" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <div className="rounded-lg bg-cream p-7 h-full">
              <div className="h-full flex flex-col justify-between">
                <h3 className="text-dusk max-w-[400px]">
                  {data.metaobject?.right_title?.value || ''}
                </h3>
                <div className="w-full flex justify-end">
                  <Link
                    to={data.metaobject?.right_url?.value || ''}
                    className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] p-3 md:p-4 bg-noir rounded-full"
                  >
                    <img src={arrowRight} className="invert w-full h-full" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
