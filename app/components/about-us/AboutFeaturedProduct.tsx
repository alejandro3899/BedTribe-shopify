import {Image, Money} from '@shopify/hydrogen';
import {AboutFeaturedProductQuery} from 'storefrontapi.generated';

export default function AboutFeaturedProduct({
  data,
}: {
  data: AboutFeaturedProductQuery;
}) {
  const featuredProductData = data.metaobject;
  if (!featuredProductData) return null;
  return (
    <div className="con pt-5 pb-10 md:pt-6 md:pb-9">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div
          className="pb-[142%] relative bg-center bg-cover rounded-lg"
          style={{
            backgroundImage: `url(${
              featuredProductData.image?.reference?.image?.url || ''
            })`,
          }}
        >
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
        {featuredProductData.product?.reference && (
          <div className="relative">
            <div
              className="pb-[100%] bg-center bg-50% bg-no-repeat rounded-lg self-baseline bg-product-card"
              style={{
                backgroundImage: `url(${
                  featuredProductData.product?.reference?.featuredImage?.url ||
                  ''
                })`,
              }}
            ></div>
            <div className="md:absolute md:h-full md:flex md:flex-col md:justify-between md:items-stretch md:p-7 mt-3">
              <div className="flex items-center justify-between">
                <p>{featuredProductData.product?.reference?.title || ''}</p>
              </div>
              <Money
                className="text"
                data={
                  featuredProductData.product.reference.priceRange
                    .minVariantPrice
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
