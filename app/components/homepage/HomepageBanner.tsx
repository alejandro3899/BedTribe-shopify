import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {HomepageBannerQuery} from 'storefrontapi.generated';

export default function HomepageBanner({data}: {data: HomepageBannerQuery}) {
  return (
    <div className="h-screen relative">
      {data.metaobject?.imageD?.reference?.image && (
        <Image
          data={data.metaobject.imageD.reference.image}
          sizes="100vw"
          alt="homepage desktop banner"
          className="hidden md:block w-full h-full object-cover object-center rounded-lg"
        />
      )}
      {data.metaobject?.imageM?.reference?.image && (
        <Image
          data={data.metaobject.imageM.reference.image}
          sizes="100vw"
          alt="homepage mobile banner"
          className="block md:hidden w-full h-full object-cover object-center rounded-xl"
        />
      )}
      <div className="absolute inset-0">
        <div className="con h-full py-10">
          <div className="w-full h-full flex flex-col justify-center items-center md:items-start md:justify-end">
            <h1 className="text-cream text-center md:text-left">
              {data.metaobject?.title?.value || ''}
            </h1>
            <p className="mt-2 md:mt-1 text-cream text-center md:text-left">
              {data.metaobject?.subtitle?.value || ''}
            </p>
            {data.metaobject?.btnLabel?.value && data.metaobject.btnLink?.value}
            <div className="mt-5 md:mt-6 flex md:justify-center">
              <Link
                to={data.metaobject?.btnLink?.value || '#'}
                prefetch="intent"
                className="button bg-transparent border border-cream text-cream"
              >
                {data.metaobject?.btnLabel?.value}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
