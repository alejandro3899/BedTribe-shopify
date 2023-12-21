import {Image, Money} from '@shopify/hydrogen';
import {CartApiQueryFragment} from 'storefrontapi.generated';
import CartLineQuantity from './CartLineQuantity';

type CartLine = CartApiQueryFragment['lines']['nodes'][0];

export default function CartLineItem({line}: {line: CartLine}) {
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
              <div className="text-moon text-[9px] uppercase" key={option.name}>
                {option.name}: {option.value}
              </div>
            ))}
          </div>
        </div>
        <CartLineQuantity line={line} />
      </div>
    </div>
  );
}
