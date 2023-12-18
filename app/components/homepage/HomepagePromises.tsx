import {Link} from '@remix-run/react';
import {Image, flattenConnection} from '@shopify/hydrogen';
import {HomepagePromisesQuery} from 'storefrontapi.generated';

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
              <div
                className="flex items-center gap-1 md:gap-3"
                key={_promise.id}
              >
                {_promise.icon?.reference?.image && (
                  <Image
                    data={_promise.icon?.reference?.image}
                    alt="home5"
                    className="max-w-[54px] h-[54px] md:max-w-[66px] md:h-[66px] lg:max-w-[80px] lg:h-[80px] p-[5px] md:p-2 grow-0 shrink"
                  />
                )}
                <div className="display-d whitespace-break-spaces font-semibold md:whitespace-nowrap">
                  {_promise.text?.value || ''}
                </div>
              </div>
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
