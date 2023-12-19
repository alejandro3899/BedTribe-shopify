import {Link} from '@remix-run/react';
import {Image, flattenConnection} from '@shopify/hydrogen';
import {useState} from 'react';
import AnimateHeight from 'react-animate-height';
import {
  HomepagePromiseItemFragment,
  HomepagePromisesQuery,
} from 'storefrontapi.generated';
import plusSvg from '~/assets/plus.svg';
import downSvg from '~/assets/Dropdown.svg';

export default function HomepagePromises({
  data,
}: {
  data: HomepagePromisesQuery;
}) {
  if (!data.metaobject?.promises?.references) return null;

  return (
    <div className="con">
      <div className="pt-20 pb-10 flex flex-col items-center gap-16 md:gap-24">
        <div className="px-16 md:px-0 flex flex-col items-start md:items-center gap-7 md:gap-12">
          {flattenConnection(data.metaobject.promises.references).map(
            (_promise) => (
              <HomepagePromiseItem data={_promise} key={_promise.id} />
            ),
          )}
        </div>
        <Link
          to="#"
          className="button bg-transparent border border-dusk text-black"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

const HomepagePromiseItem = ({data}: {data: HomepagePromiseItemFragment}) => {
  const [height, setHeight] = useState<0 | 'auto'>(0);

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-start md:justify-center gap-1 md:gap-3 relative"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        {data.icon?.reference?.image && (
          <Image
            data={data.icon?.reference?.image}
            alt="home5"
            className="max-w-[54px] h-[54px] md:max-w-[66px] md:h-[66px] lg:max-w-[80px] lg:h-[80px] p-[5px] md:p-2 grow-0 shrink"
          />
        )}
        <div className="display-d whitespace-break-spaces md:whitespace-nowrap md:relative">
          {data.text?.value || ''}
          <div className="absolute top-0 -right-7 rounded-full bg-cream p-1">
            {height === 0 ? (
              <img src={plusSvg} className="w-3 h-3" />
            ) : (
              <img src={downSvg} className="w-3 h-3" />
            )}
          </div>
        </div>
      </div>
      <AnimateHeight height={height}>
        <div className="py-4 md:py-6 max-w-[900px] mx-auto">
          <p className="text-center">{data.desc?.value || ''}</p>
        </div>
      </AnimateHeight>
    </div>
  );
};
