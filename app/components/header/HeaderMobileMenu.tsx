import {
  ChildMenuItemFragment,
  GlobalSettingsQuery,
  HeaderQuery,
  MenuItemFragment,
} from 'storefrontapi.generated';
import {LayoutProps} from '../Layout';
import {Fragment, useState} from 'react';
import {useRootLoaderData} from '~/root';
import Drawer from '../global/Drawer';
import cross from '~/assets/cross.svg';
import {NavLink} from '@remix-run/react';
import {MenuItem} from '@shopify/hydrogen/storefront-api-types';
import AnimateHeight from 'react-animate-height';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export default function HeaderMenuMobileToggle({
  primaryDomainUrl,
  menu,
  globalSettings,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  globalSettings: GlobalSettingsQuery;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <>
      <span
        className="header-menu-item md:hidden"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </span>
      <Drawer
        enterFrom="LEFT"
        closeDrawer={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <div className="p-5 relative">
          <button
            className="absolute top-5 right-5 p-0"
            onClick={() => setIsOpen(false)}
          >
            <img src={cross} alt="cross icon" />
          </button>
          <div className="mt-4">
            <NavLink
              to={globalSettings.metaobject?.nav_image_link?.value || ''}
              className="w-full"
            >
              <div
                className="flex before:w-0 before:pb-[80%] items-stretch bg-cover bg-center bg-no-repeat rounded-xl"
                style={{
                  backgroundImage: `url(${
                    globalSettings.metaobject?.nav_image?.reference?.image
                      ?.url || ''
                  })`,
                }}
              ></div>
              <div className="mt-2 flex justify-center">
                <div className="px-2 py-1 bg-noir text-white text-[10px] leading-none rounded-full">
                  {globalSettings.metaobject?.nav_image_label?.value || ''}
                </div>
              </div>
            </NavLink>
          </div>
          <div className="flex flex-col mt-6 border-t border-noir">
            {menu &&
              menu.items.map((item) => {
                if (!item.url) return null;
                // if the url is internal, we strip the domain
                const url =
                  item.url.includes('myshopify.com') ||
                  item.url.includes(publicStoreDomain) ||
                  item.url.includes(primaryDomainUrl)
                    ? new URL(item.url).pathname
                    : item.url;

                if (item.items.length > 0)
                  return (
                    <Fragment key={item.id}>
                      {item.items.map((subItem) => (
                        <SubNavItem
                          key={subItem.id}
                          item={subItem}
                          primaryDomainUrl={primaryDomainUrl}
                        />
                      ))}
                    </Fragment>
                  );
                return (
                  <NavLink
                    className="header-menu-item py-4 border-b border-noir"
                    end
                    key={item.id}
                    prefetch="intent"
                    to={url}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
          </div>
        </div>
      </Drawer>
    </>
  );
}

const SubNavItem = ({
  item,
  primaryDomainUrl,
}: {
  item: ChildMenuItemFragment;
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) => {
  const {publicStoreDomain} = useRootLoaderData();
  const [height, setHeight] = useState<0 | 'auto'>(0);

  return (
    <div className="py-4 border-b border-noir">
      <div
        className="relative flex"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        <span className="header-menu-item">{item.title}</span>
        <div
          className={`absolute w-[13px] border-t border-noir right-0 top-1/2 -translate-y-1/2 transition-transform duration-150 ease-in-out ${
            height === 'auto' ? 'rotate-180' : ''
          }`}
        ></div>
        <div
          className={`absolute h-[13px] border-r border-noir right-[6px] top-1/2 -translate-y-1/2 transition-transform duration-150 ease-in-out ${
            height === 'auto' ? 'rotate-90' : ''
          }`}
        ></div>
      </div>
      <AnimateHeight height={height} duration={150}>
        <div className="mt-4 space-y-3 flex flex-col">
          {item.items.map((subItem) => {
            if (!subItem.url) return null;
            // if the url is internal, we strip the domain
            const url =
              subItem.url.includes('myshopify.com') ||
              subItem.url.includes(publicStoreDomain) ||
              subItem.url.includes(primaryDomainUrl)
                ? new URL(subItem.url).pathname
                : subItem.url;

            return (
              <NavLink to={url} className="header-menu-item" key={subItem.id}>
                {subItem.title}
              </NavLink>
            );
          })}
        </div>
      </AnimateHeight>
    </div>
  );
};
