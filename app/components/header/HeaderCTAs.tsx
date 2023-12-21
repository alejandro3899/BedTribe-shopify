import {NavLink} from '@remix-run/react';
import {LayoutProps} from '../Layout';
import CartToggle from '../cart/CartBadge';
import account from '~/assets/account.svg';
import SearchToggle from './SearchToggle';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export default function HeaderCTAs({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <nav
      className="flex space-x-1 md:space-x-5 [&>*]:flex [&>*]:justify-center [&>*]:items-center"
      role="navigation"
    >
      <SearchToggle />
      <NavLink to="/account">
        <img src={account} alt="header account" className="block md:hidden" />
        <p className="header-menu-item hidden md:block">Account</p>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}
