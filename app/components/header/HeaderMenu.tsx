import {HeaderQuery, MenuItemFragment} from 'storefrontapi.generated';
import {LayoutProps} from '../Layout';
import {useRootLoaderData} from '~/root';
import {NavLink} from '@remix-run/react';
import HeaderMenuMobileToggle from './HeaderMobileMenu';
import {Fragment} from 'react';
import {Image} from '@shopify/hydrogen';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export default function HeaderMenu({
  menu,
  primaryDomainUrl,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const {publicStoreDomain} = useRootLoaderData();
  const {globalSettings} = useRootLoaderData();

  return (
    <>
      <nav className="space-x-5 hidden md:flex">
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
            return (
              <Fragment key={item.id}>
                {item.items.length === 0 ? (
                  <NavLink
                    className={({isActive}) =>
                      `header-menu-item peer relative z-20 ${
                        isActive ? 'bg-dusk text-cream' : 'text-noir'
                      }`
                    }
                    end
                    key={item.id}
                    prefetch="intent"
                    to={url}
                  >
                    {item.title}
                  </NavLink>
                ) : (
                  <div
                    className="header-menu-item group text-noir"
                    key={item.id}
                  >
                    <span className="relative z-20 cursor-pointer">
                      {item.title}
                    </span>
                    {item.items.length > 0 && (
                      <div className="absolute top-0 left-0 right-0 !m-0 pt-12 px-1 pb-1 hidden group-hover:block bg-cream rounded-lg">
                        <div className="bg-shade px-7 pt-8 pb-[70px] rounded-lg">
                          <div className="flex space-x-8">
                            <NavLink
                              to={
                                globalSettings.metaobject?.nav_image_link
                                  ?.value || ''
                              }
                              className="w-40"
                            >
                              <div className="flex items-stretch before:w-0 before:pb-[125%]">
                                <div className="w-full">
                                  {globalSettings.metaobject?.nav_image
                                    ?.reference?.image && (
                                    <Image
                                      className="rounded-xl w-full h-full object-cover object-center"
                                      data={
                                        globalSettings.metaobject.nav_image
                                          .reference.image
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 flex justify-center">
                                <div className="px-2 py-1 bg-white text-black text-[10px] leading-none rounded-full">
                                  {globalSettings.metaobject?.nav_image_label
                                    ?.value || ''}
                                </div>
                              </div>
                            </NavLink>
                            {item.items.map((subItem) => {
                              return (
                                <div className="w-[180px]" key={subItem.id}>
                                  <div className="space-y-[18px]">
                                    <div className="text-sm text-black font-semibold">
                                      {subItem.title}
                                    </div>
                                    {subItem.items.map((grandChildItem) => {
                                      if (!grandChildItem.url) return null;
                                      const grandChildUrl =
                                        grandChildItem.url.includes(
                                          'myshopify.com',
                                        ) ||
                                        grandChildItem.url.includes(
                                          publicStoreDomain,
                                        ) ||
                                        grandChildItem.url.includes(
                                          primaryDomainUrl,
                                        )
                                          ? new URL(grandChildItem.url).pathname
                                          : grandChildItem.url;
                                      return (
                                        <NavLink
                                          key={grandChildItem.id}
                                          to={grandChildUrl}
                                          className={({isActive}) =>
                                            `block text-sm leading-none ${
                                              isActive ? 'font-semibold' : ''
                                            }`
                                          }
                                        >
                                          {grandChildItem.title}
                                        </NavLink>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            );
          })}
      </nav>
      <HeaderMenuMobileToggle
        menu={menu}
        globalSettings={globalSettings}
        primaryDomainUrl={primaryDomainUrl}
      />
    </>
  );
}
