import {flattenConnection} from '@shopify/hydrogen';
import {RecommendedProductsQuery} from 'storefrontapi.generated';
import {Swiper, SwiperSlide} from 'swiper/react';
import ProductItemV1 from '../ProductItemV1';

export default function RecommendedProducts({
  data,
}: {
  data: RecommendedProductsQuery;
}) {
  return (
    <div className="pt-14 pb-11 md:pt-[60px] md:pb-14 overflow-hidden">
      <div className="con">
        <h2>
          Shop recommended <span className="hidden md:block">products</span>
        </h2>
        <div className="mt-5">
          <Swiper
            className="!overflow-visible"
            slidesPerView={1.6}
            spaceBetween={12}
            breakpoints={{
              600: {slidesPerView: 2.1},
              900: {slidesPerView: 2.5, spaceBetween: 16},
              1200: {slidesPerView: 3},
            }}
          >
            {flattenConnection(data.products).map((productItem) => (
              <SwiperSlide key={productItem.id}>
                <ProductItemV1 product={productItem} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
