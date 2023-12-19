import {Link} from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen';
import Marquee from 'react-fast-marquee';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

export function Footer({
  metaobject,
  shop,
}: FooterQuery & {shop: HeaderQuery['shop']}) {
  if (!metaobject) return null;

  return (
    <footer className="h-[300px] md:h-[310px] flex flex-col">
      <div className="bg-cream grow">
        <div className="con py-5 h-full">
          <div className="flex flex-col jutify-between h-full">
            <h6 className="max-w-[270px] md:max-w-[400px]">
              {metaobject.desc?.value || ''}
            </h6>
            <div className="flex flex-col justify-end items-stretch grow">
              <div className="flex flex-col items-start md:flex-row grow justify-between md:items-end pt-8">
                <FooterMenu
                  metaobject={metaobject}
                  primaryDomainUrl={shop.primaryDomain.url}
                />
                <SingupNewsLetter />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[10px]">
        <Marquee>
          <div className="flex space-x-10">
            {metaobject.marqueeTexts?.value &&
              [
                ...(JSON.parse(metaobject.marqueeTexts.value) as string[]),
                ...(JSON.parse(metaobject.marqueeTexts.value) as string[]),
              ].map((marqueeText, index) => (
                <div className="font-mono text-16 md:text-28" key={index}>
                  {marqueeText}
                </div>
              ))}
          </div>
        </Marquee>
      </div>
    </footer>
  );
}

function FooterMenu({
  metaobject,
}: {
  metaobject: FooterQuery['metaobject'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  return (
    <div className="flex flex-wrap md:flex-nowrap md:space-x-5 lg:space-x-8">
      <span className="py-1 md:py-0 w-1/2 whitespace-nowrap md:w-fit text-xs md:text-sm">
        &copy;{new Date().getFullYear()} Bedtribe
      </span>
      {metaobject?.socialLinks?.references &&
        flattenConnection(metaobject.socialLinks.references).map(
          (socialLink) => (
            <Link
              key={socialLink.id}
              className="py-1 md:py-0 w-1/2 whitespace-nowrap md:w-fit text-xs md:text-sm"
              to={socialLink.url?.value || '#'}
            >
              {socialLink.title?.value || ''}
            </Link>
          ),
        )}
    </div>
  );
}

const SingupNewsLetter = () => {
  return (
    <div className="flex items-center justify-between md:justify-end w-full">
      <label htmlFor="email">
        <span className="text-11 md:text-sm">Newsletter</span>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-transparent ml-3 placeholder:text-dusk text-11 focus:outline-none"
          placeholder="Enter email address"
        />
      </label>
      <button className="normal-case text-11 md:text-sm font-sans py-0 px-3">
        Sing Up
      </button>
    </div>
  );
};
