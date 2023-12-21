import {Link} from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen';
import {HomepageTiktoksQuery} from 'storefrontapi.generated';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function HomepageTiktok({data}: {data: HomepageTiktoksQuery}) {
  if (!data.metaobject?.items?.references) return null;

  return (
    <div className="pt-14 pb-20 md:pb-28 overflow-hidden">
      <div className="con">
        <Swiper
          spaceBetween={20}
          slidesPerView={'auto'}
          className="!overflow-visible"
        >
          {flattenConnection(data.metaobject.items.references).map((item) => (
            <SwiperSlide className="!w-[240px]" key={item.id}>
              <div className="bg-cream rounded-lg md:rounded-xl overflow-hidden">
                <div
                  className="pb-[150%] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      item.image?.reference?.image?.url || ''
                    })`,
                  }}
                ></div>
                <div className="px-4 py-3 small">
                  @{item.username?.value || ''}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-10 md:mt-16 flex justify-center">
          <Link
            to="#"
            className="button bg-transparent border border-black text-black"
          >
            find us on tiktok
          </Link>
        </div>
      </div>
    </div>
  );
}
