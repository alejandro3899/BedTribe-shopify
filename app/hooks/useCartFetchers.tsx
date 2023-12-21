import {useFetchers} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';

export function useCartFetchers(actionNames: string[]) {
  const fetchers = useFetchers();
  const cartFetchers = [];

  for (const fetcher of fetchers) {
    const formData = fetcher.formData;
    if (formData) {
      const formInputs = CartForm.getFormInput(formData);
      if (actionNames.includes(formInputs.action)) {
        cartFetchers.push(fetcher);
      }
    }
  }
  return cartFetchers;
}
