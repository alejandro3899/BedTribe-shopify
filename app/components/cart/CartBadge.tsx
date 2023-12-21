import {CartForm} from '@shopify/hydrogen';
import {Suspense, useEffect} from 'react';
import {CartApiQueryFragment} from 'storefrontapi.generated';
import {useCart} from '~/hooks/useCart';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import cartSvg from '~/assets/cart.svg';
import Drawer from '../global/Drawer';
import CartMain from './CartMain';
import {Await} from '@remix-run/react';

function CartBadge({
  count,
  cart,
}: {
  count: number;
  cart?: CartApiQueryFragment;
}) {
  const addToCartFetchers = useCartFetchers([CartForm.ACTIONS.LinesAdd]);
  const {isOpen, openCart, closeCart} = useCart();

  useEffect(() => {
    if (
      !addToCartFetchers.length ||
      addToCartFetchers[0].state === 'submitting'
    )
      return;
    else {
      !isOpen && openCart();
    }
  }, [addToCartFetchers[0]?.state]);

  return (
    <>
      <div onClick={() => openCart()} className="relative cursor-pointer">
        <img src={cartSvg} alt="header cart" className="block md:hidden" />
        <div className="absolute top-[1px] right-0 text-[9px] block md:hidden">
          {count}
        </div>
        <p className="header-menu-item hidden md:block">Cart({count})</p>
      </div>
      <Drawer enterFrom="RIGHT" closeDrawer={closeCart} isOpen={isOpen}>
        <CartMain cart={cart} count={count} closeCart={closeCart} />
      </Drawer>
    </>
  );
}

export default function CartToggle({
  cart,
}: {
  cart: Promise<CartApiQueryFragment | null>;
}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} cart={cart} />;
        }}
      </Await>
    </Suspense>
  );
}
