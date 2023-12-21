import {HeaderQuery} from 'storefrontapi.generated';
import {LayoutProps} from '../Layout';
import {useRootLoaderData} from '~/root';
import {NavLink} from '@remix-run/react';
import HeaderMenuMobileToggle from './HeaderMobileMenu';

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
        {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
          if (!item.url) return null;

          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          return (
            <NavLink
              className={({isActive}) =>
                `header-menu-item ${
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
          );
        })}
      </nav>
      <HeaderMenuMobileToggle menu={menu} primaryDomainUrl={primaryDomainUrl} />
    </>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};
