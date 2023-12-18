import {Await, NavLink} from '@remix-run/react';
import {Suspense, useState} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/root';
import logo from '~/assets/logo.svg';
import account from '~/assets/account.svg';
import cart from '~/assets/cart.svg';
import search from '~/assets/search.svg';
import cross from '~/assets/cross.svg';
import Drawer from './Drawer';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export function Header({header, cart}: HeaderProps) {
  const {menu} = header;
  return (
    <header className="absolute top-5 left-5 right-5 bg-cream rounded-lg px-3 md:px-5 h-10 md:h-12">
      <NavLink
        prefetch="intent"
        to="/"
        style={activeLinkStyle}
        end
        className="center"
      >
        <img
          src={logo}
          alt="site logo"
          className="w-[90px] md:w-[100px] lg:w-[120px]"
        />
      </NavLink>
      <div className="flex justify-between items-center h-full">
        <HeaderMenu
          menu={menu}
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
        <HeaderCtas cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({
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
              className="header-menu-item"
              end
              key={item.id}
              prefetch="intent"
              style={activeLinkStyle}
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

function HeaderCtas({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <nav
      className="flex space-x-1 [&>*]:flex [&>*]:justify-center [&>*]:items-center"
      role="navigation"
    >
      <SearchToggle />
      <NavLink prefetch="intent" to="/account">
        <img src={account} alt="header account" />
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle({
  primaryDomainUrl,
  menu,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
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
            className="absolute top-5 right-5"
            onClick={() => setIsOpen(false)}
          >
            <img src={cross} alt="cross icon" />
          </button>
          <div className="flex flex-col space-y-5 mt-6">
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
                  className="header-menu-item"
                  end
                  key={item.id}
                  prefetch="intent"
                  style={activeLinkStyle}
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

function SearchToggle() {
  return (
    <a href="#search-aside">
      <img src={search} alt="header search" />
    </a>
  );
}

function CartBadge({count}: {count: number}) {
  return (
    <a href="#cart-aside">
      <img src={cart} alt="header cart" />
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
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

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
