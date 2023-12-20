import {Image} from '@shopify/hydrogen';
import {ProductFeaturesSliderItemFragment} from 'storefrontapi.generated';
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import arrowLeft from '~/assets/left-arrow.svg';
import arrowRight from '~/assets/right-arrow.svg';

export default function ProductFeaturesSlider({
  data,
}: {
  data: ProductFeaturesSliderItemFragment[];
}) {
  return (
    <div className="py-5">
      <div className="con">
        <div className="relative">
          <div className="flex space-x-2 absolute top-7 left-7 z-10">
            <div
              className="bg-cream rounded-full w-8 h-8 p-1"
              id="pdp-features-prev"
            >
              <img src={arrowLeft} className="w-full h-full" />
            </div>
            <div
              className="bg-cream rounded-full w-8 h-8 p-1"
              id="pdp-features-next"
            >
              <img src={arrowRight} className="w-full h-full" />
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            navigation={{
              prevEl: '#pdp-features-prev',
              nextEl: '#pdp-features-next',
            }}
            modules={[Navigation]}
          >
            {data.map((slider) => (
              <SwiperSlide key={slider.id}>
                <ProductFeatureItem data={slider} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

const ProductFeatureItem = ({
  data,
}: {
  data: ProductFeaturesSliderItemFragment;
}) => {
  return (
    <div className="h-[736px] md:h-[680px] relative">
      {data.image?.reference?.image && (
        <Image
          data={data.image.reference.image}
          className="w-full h-full object-cover object-center hidden md:block rounded-lg"
        />
      )}
      {data.image_m?.reference?.image && (
        <Image
          data={data.image_m.reference.image}
          className="w-full h-full object-cover object-center block md:hidden rounded-lg"
        />
      )}
      <div className="absolute inset-0 p-7 pt-[72px] md:pt-[76px]">
        <div className="w-full h-full flex flex-col justify-between items-stretch">
          <div>
            <h3 className="text-cream">{data.title?.value || ''}</h3>
            <p className="text-cream max-w-[234px] md:max-w-[461px] mt-1">
              {data.desc?.value || ''}
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:justify-end">
            {data.details_image_1?.reference?.image && (
              <div className="w-[120px] md:w-[190px]">
                <Image
                  data={data.details_image_1.reference.image}
                  className="rounded-full"
                />
              </div>
            )}
            {data.details_image_2?.reference?.image && (
              <div className="w-[120px] md:w-[190px]">
                <Image
                  data={data.details_image_2.reference.image}
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
