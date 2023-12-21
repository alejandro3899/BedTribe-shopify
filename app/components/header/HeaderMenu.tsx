import {HeaderQuery, MenuItemFragment} from 'storefrontapi.generated';
import {LayoutProps} from '../Layout';
import {useRootLoaderData} from '~/root';
import {NavLink} from '@remix-run/react';
import HeaderMenuMobileToggle from './HeaderMobileMenu';
import {Fragment} from 'react';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export default function HeaderMenu({
  menu,
  primaryDomainUrl,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const {publicStoreDomain} = useRootLoaderData();

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
                      <div className="absolute top-0 left-0 right-0 !m-0 pt-14 px-5 pb-3 hidden group-hover:block bg-cream rounded-lg">
                        {item.items.map((subItem) => {
                          if (!subItem.url) return null;
                          const subUrl =
                            subItem.url.includes('myshopify.com') ||
                            subItem.url.includes(publicStoreDomain) ||
                            subItem.url.includes(primaryDomainUrl)
                              ? new URL(subItem.url).pathname
                              : subItem.url;
                          return (
                            <NavLink
                              key={subItem.id}
                              to={subUrl}
                              className={({isActive}) =>
                                `border-b border-noir py-5 block text-18 leading-none uppercase ${
                                  isActive ? 'font-semibold' : ''
                                }`
                              }
                            >
                              {subItem.title}
                            </NavLink>
                          );
                        })}
                        <NavLink
                          to={url}
                          className="py-5 small text-11 block !leading-none"
                        >
                          vew all
                        </NavLink>
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            );
          })}
      </nav>
      <HeaderMenuMobileToggle menu={menu} primaryDomainUrl={primaryDomainUrl} />
    </>
  );
}
