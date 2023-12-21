import {Money} from '@shopify/hydrogen';
import {CartApiQueryFragment} from 'storefrontapi.generated';
import {useRootLoaderData} from '~/root';

export default function CartProgress({cart}: {cart: CartApiQueryFragment}) {
  const {globalSettings} = useRootLoaderData();

  if (!globalSettings.metaobject?.free_shipping_threshold?.value) return null;

  const left =
    parseFloat(globalSettings.metaobject.free_shipping_threshold.value) -
    parseInt(cart.cost.totalAmount.amount);
  const width =
    left > 0
      ? (parseInt(cart.cost.totalAmount.amount) * 100) /
        parseFloat(globalSettings.metaobject.free_shipping_threshold.value)
      : 100;

  return (
    <div>
      <div className="text-[9px] text-mono uppercase leading-tight tracking-[.36px]">
        {left > 0 ? (
          <>
            $
            <Money
              data={{amount: left.toString(), currencyCode: 'SGD'}}
              as="span"
              withoutTrailingZeros
              withoutCurrency
            />{' '}
            more to free shipping
          </>
        ) : (
          'Congraculation! You can enjoy free shipping.'
        )}
      </div>
      <div className="mt-[5px] rounded-full border border-black relative h-3 overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 bg-noir transition-all ease-in-out duration-200"
          style={{width: `${width}%`}}
        ></div>
      </div>
    </div>
  );
}
