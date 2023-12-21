import {Image, flattenConnection} from '@shopify/hydrogen';
import {HomepageLogosQuery} from 'storefrontapi.generated';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function HomepageLogos({data}: {data: HomepageLogosQuery}) {
  if (!data.metaobject?.logos?.references) return null;
  return (
    <div className="py-10 md:py-20">
      <div className="justify-center items-center space-x-10 hidden lg:flex">
        {flattenConnection(data.metaobject.logos.references).map((logo) => {
          if (!logo.image) return null;
          return (
            <Image
              data={logo.image}
              alt=""
              key={logo.image.id}
              sizes="216px"
              width="216"
            />
          );
        })}
      </div>
      <div className="lg:hidden">
        <Swiper slidesPerView={'auto'} spaceBetween={40} centeredSlides={true}>
          {flattenConnection(data.metaobject.logos.references).map((logo) => {
            if (!logo.image) return null;
            return (
              <SwiperSlide className="!w-fit" key={logo.image.id}>
                <Image data={logo.image} alt="" sizes="216px" width="216" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
