import {CartForm} from '@shopify/hydrogen';
import {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import plusSvg from '~/assets/plus.svg';
import minusSvg from '~/assets/minus.svg';
import {CartApiQueryFragment} from 'storefrontapi.generated';

type CartLine = CartApiQueryFragment['lines']['nodes'][0];

export default function CartLineQuantity({line}: {line: CartLine}) {
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
