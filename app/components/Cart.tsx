import {CartForm, Image, Money} from '@shopify/hydrogen';
import cross from '~/assets/cross.svg';
import plusSvg from '~/assets/plus.svg';
import minusSvg from '~/assets/minus.svg';
import {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {CartApiQueryFragment} from 'storefrontapi.generated';

type CartLine = CartApiQueryFragment['lines']['nodes'][0];

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
    <div className="p-7 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl">Your Cart ({count} Item)</div>
        <button className="p-0" onClick={() => closeCart()}>
          <img src={cross} alt="cross icon" className=" w-6 h-6" />
        </button>
      </div>
      <div className="mt-8 space-y-5">
        {cart.lines.nodes.map((line) => {
          return (
            <div className="flex justify-between space-x-2" key={line.id}>
              <div className="bg-product-card shrink-0 grow-0 basis-[92px] h-[120px] rounded">
                {line.merchandise.image && (
                  <Image
                    data={line.merchandise.image}
                    className="w-full h-full object-contain object-center"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between grow">
                <div>
                  <div className="flex justify-between items-start space-x-5">
                    <p className="text-16">{line.merchandise.product.title}</p>
                    <div className="text-xs">
                      <Money data={line.cost.totalAmount} />
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {line.merchandise.selectedOptions.map((option) => (
                      <div
                        className="text-moon text-[9px] uppercase"
                        key={option.name}
                      >
                        {option.name}: {option.value}
                      </div>
                    ))}
                  </div>
                </div>
                <CartLineQuantity line={line} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10"></div>
    </div>
  );
}

function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center space-x-4">
      <div className="h-6 w-[88px] border border-noir rounded-full px-2 py-1 flex items-center justify-between">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            name="decrease-quantity"
            value={prevQuantity}
            className="p-0"
          >
            <img src={minusSvg} className="w-3 h-3" />
          </button>
        </CartLineUpdateButton>
        <div className="grow text-[10px] text-center">{quantity}</div>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            className="p-0"
          >
            <img src={plusSvg} className="w-3 h-3" />
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  );
}

function CartLineRemoveButton({lineIds}: {lineIds: string[]}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button type="submit" className="p-0">
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}
