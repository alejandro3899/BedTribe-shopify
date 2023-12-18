import {Image, flattenConnection} from '@shopify/hydrogen';
import {HomepagePressesQuery} from 'storefrontapi.generated';

export default function HomepagePresses({data}: {data: HomepagePressesQuery}) {
  if (!data.metaobject?.presses?.references) return null;

  return (
    <div className="con bg-cream">
      <div className="py-14 md:pt-32 md:pb-28 ">
        <h2 className="pb-6 md:pb-13">{data.metaobject.title?.value || ''}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[60px] md:gap-x-10">
          {flattenConnection(data.metaobject.presses.references).map(
            (press, index) => (
              <div
                className={`flex flex-col-reverse md:flex-col gap-4 md:gap-5 ${
                  index % 2 === 1 ? 'md:flex-col-reverse' : ''
                }`}
                key={press.id}
              >
                <div className="md:pr-9">
                  <span className="px-4 py-2 border border-black rounded-[20px] text-[18px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.4px] !leading-[11px] inline-block">
                    {`00${index + 1}`.slice(-2)}
                  </span>
                  <h6 className="mt-2 md:mt-3">{press.desc?.value || ''}</h6>
                </div>
                <div
                  className="rounded-lg pb-[117%] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      press.image?.reference?.image?.url || ''
                    })`,
                  }}
                ></div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
