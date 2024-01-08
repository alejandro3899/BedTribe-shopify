import {LoaderFunctionArgs} from '@remix-run/server-runtime';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
}
