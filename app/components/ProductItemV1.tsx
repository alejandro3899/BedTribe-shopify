import {Link} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import {ProductItemFragment} from 'storefrontapi.generated';

export default function ProductItemV1({
  product,
}: {
  product: ProductItemFragment;
}) {
  const badgeTag = product.tags.find((tag) => tag.includes('badge:'));

  return (
    <Link className="relative block" to={`/products/${product.handle}`}>
      <div
        className="pb-[120%] bg-product-card bg-80% bg-center bg-no-repeat rounded-lg"
        style={{backgroundImage: `url(${product.featuredImage?.url || ''})`}}
      ></div>
      <div className="mt-3 md:mt-0 md:absolute md:p-7 md:inset-0 md:flex md:flex-col md:justify-between">
        <div className="flex items-center justify-between space-x-10">
          <p className="text-sm md:text-lg">{product.title}</p>
          {badgeTag && (
            <p className="badge uppercase text-11 hidden md:block">
              {badgeTag.split('badge:')[1]}
            </p>
          )}
        </div>
        <div className="text text-sm md:text-lg">
          <Money data={product.priceRange.minVariantPrice} />
        </div>
      </div>
    </Link>
  );
}
