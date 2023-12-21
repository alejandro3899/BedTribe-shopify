import {CartApiQueryFragment} from 'storefrontapi.generated';

export default function CartCheckoutBtn({cart}: {cart: CartApiQueryFragment}) {
  if (!cart.checkoutUrl) return null;

  return (
    <div className="mt-9 flex">
      <a
        href={cart.checkoutUrl}
        className="font-sans text-xs uppercase leading-none bg-noir text-cream block w-full px-6 py-4 text-center rounded-full"
      >
        proceed to payment
      </a>
    </div>
  );
}
