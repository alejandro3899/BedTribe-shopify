import cross from '~/assets/cross.svg';
import {CartApiQueryFragment} from 'storefrontapi.generated';
import CartLineItem from './cart/CartLineItem';
import CartNote from './cart/CartNote';
import CartProgress from './cart/CartProgress';
import CartCheckoutBtn from './cart/CartCheckoutBtn';

export default function CartMain({
  cart,
  count,
  closeCart,
}: {
  cart?: CartApiQueryFragment;
  count: number;
  closeCart: () => void;
}) {
  if (!cart) return null;

  return (
    <div className="p-7 h-full">
      <div className="flex flex-col h-full ">
        <div className="bg-white shrink-0">
          <div className="flex justify-between items-center pb-2">
            <div className="text-xl">Your Cart ({count} Item)</div>
            <button
              className="p-0 focus:outline-none"
              onClick={() => closeCart()}
            >
              <img src={cross} alt="cross icon" className=" w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="grow overflow-auto pt-6 pb-6 cart-lines pr-[5px]">
          <div className="space-y-5">
            {cart.lines.nodes.map((line) => {
              return <CartLineItem line={line} key={line.id} />;
            })}
          </div>
          <div className="mt-10">
            <CartNote cart={cart} />
          </div>
        </div>
        <div className="pt-2 bg-white shrink-0">
          <CartProgress cart={cart} />
          <CartCheckoutBtn cart={cart} />
        </div>
      </div>
    </div>
  );
}
