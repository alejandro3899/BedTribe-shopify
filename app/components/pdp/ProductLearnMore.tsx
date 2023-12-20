import {ProductLearnMoreItemFragment} from 'storefrontapi.generated';
import plusSvg from '~/assets/plus.svg';
import minusSvg from '~/assets/minus.svg';
import {useState} from 'react';
import AnimateHeight from 'react-animate-height';

export default function ProductLearnMore({
  title,
  items,
}: {
  title?: string;
  items: ProductLearnMoreItemFragment[];
}) {
  return (
    <div className="pt-8 md:pt-12 lg:pt-[60px]">
      <div className="max-w-[532px] w-full">
        {title && <h6>{title || ''}</h6>}
        <div className="mt-4 md:mt-5 border-t border-noir">
          {items.map((item) => (
            <LearnMoreItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const LearnMoreItem = ({data}: {data: ProductLearnMoreItemFragment}) => {
  const [height, setHeight] = useState<0 | 'auto'>(0);

  return (
    <div className="border-b border-noir py-3">
      <div
        className="flex items-center justify-between"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        <span className="text-xs text-noir">{data.title?.value || ''}</span>
        <img src={height === 0 ? plusSvg : minusSvg} className="w-4 h-4" />
      </div>
      <AnimateHeight height={height}>
        <div className="text-xs whitespace-pre-wrap pt-4">
          {data.desc?.value}
        </div>
      </AnimateHeight>
    </div>
  );
};
