import {NavLink} from '@remix-run/react';
import {LayoutProps} from '../Layout';
import logo from '~/assets/logo.svg';
import HeaderMenu from './HeaderMenu';
import HeaderCTAs from './HeaderCTAs';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export function Header({header, cart}: HeaderProps) {
  const {menu} = header;
  return (
    <header className="fixed top-5 left-5 right-5 bg-cream rounded-lg px-3 md:px-5 h-10 md:h-12 z-50">
      <NavLink prefetch="intent" to="/" end className="center z-20">
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
        <HeaderCTAs cart={cart} />
      </div>
    </header>
  );
}
