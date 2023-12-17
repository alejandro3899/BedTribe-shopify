import {Image} from '@shopify/hydrogen';
import {HomepageFeaturedProductQuery} from 'storefrontapi.generated';

export default function HomepageFeaturedProduct({
  data,
}: {
  data: HomepageFeaturedProductQuery;
}) {
  const featuredProductData = data.metaobject;
  if (!featuredProductData) return null;
  return (
    <div className="con pt-5 pb-10 md:pt-6 md:pb-9">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="h-[540px] md:h-screen rounded-lg overflow-hidden relative">
          {featuredProductData.image?.reference?.image && (
            <Image
              data={featuredProductData.image.reference.image}
              className="w-full h-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0">
            <div className="w-full p-7">
              <p className="small text-cream">
                {featuredProductData.subtitle?.value || ''}
              </p>
              <h4 className="mt-1 text-cream">
                {featuredProductData.title?.value || ''}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
