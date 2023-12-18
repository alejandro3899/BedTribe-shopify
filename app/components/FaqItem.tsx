import {FaqItemFragment} from 'storefrontapi.generated';
import {useState} from 'react';
import plus from '~/assets/plus.svg';
import minus from '~/assets/minus.svg';
import AnimateHeight from 'react-animate-height';

export default function FaqItem({data}: {data: FaqItemFragment}) {
  const [height, setHeight] = useState<0 | 'auto'>(0);

  return (
    <div className="w-full flex flex-col">
      <div
        className="flex justify-between border border-noir rounded-full px-7 py-4 md:px-9 md:py-6"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        <h6>{data.question?.value || ''}</h6>
        <img src={height === 0 ? plus : minus} />
      </div>
      <AnimateHeight height={height}>
        <p className="whitespace-pre-wrap py-5 px-5">
          {data.answer?.value || ''}
        </p>
      </AnimateHeight>
    </div>
  );
}
