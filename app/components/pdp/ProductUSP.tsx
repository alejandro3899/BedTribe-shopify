import {Image, flattenConnection} from '@shopify/hydrogen';
import {useState} from 'react';
import {
  ProductUspFragment,
  ProductUspItemFragment,
} from 'storefrontapi.generated';
import plusSvg from '~/assets/plus.svg';
import minusSvg from '~/assets/minus.svg';
import AnimateHeight from 'react-animate-height';

export default function ProductUSP({data}: {data: ProductUspFragment}) {
  return (
    <div className="bg-cream py-10 md:py-24">
      <div className="con px-5 md:px-10 lg:px-[60px]">
        <div className="bg-white rounded-lg py-6 md:py-12 lg:py-18 px-7 md:px-13 lg:px-[92px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-14 lg:gap-x-40 gap-y-8">
            <div>
              {data.image?.reference?.image && (
                <Image data={data.image?.reference.image} />
              )}
            </div>
            <div>
              <h3>{data.title?.value || ''}</h3>
              <p className="mt-3">{data.desc?.value || ''}</p>
              {data.uspItems?.references && (
                <div className="mt-8 border-t border-noir">
                  {flattenConnection(data.uspItems.references).map(
                    (uspItem) => (
                      <UspItem data={uspItem} key={uspItem.id} />
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UspItem = ({data}: {data: ProductUspItemFragment}) => {
  const [height, setHeight] = useState<0 | 'auto'>(0);

  return (
    <div className="border-b border-noir py-5">
      <div
        className="flex items-center justify-between"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        <div className="flex items-center space-x-5">
          {data.icon?.reference?.image && (
            <div className="w-8 h-8 shrink-0">
              <Image data={data.icon.reference.image} />
            </div>
          )}
          <h6>{data.title?.value || ''}</h6>
        </div>
        <img src={height === 0 ? plusSvg : minusSvg} className="w-6 h-6" />
      </div>
      <AnimateHeight height={height}>
        <p className="whitespace-pre-wrap pt-4">{data.desc?.value || ''}</p>
      </AnimateHeight>
    </div>
  );
};
