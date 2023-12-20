import {useLoaderData, Link} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  flattenConnection,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import {COLLECTIONS_QUERY} from '~/queries/collection';
import {useEffect, useState} from 'react';
import {
  ProductCardItemFragment,
  ProductItemFragment,
} from 'storefrontapi.generated';
import ProductItemV1 from '~/components/ProductItemV1';

export async function loader({context}: LoaderFunctionArgs) {
  const {metaobject} = await context.storefront.query(COLLECTIONS_QUERY);

  return json({data: metaobject});
}

export default function Collections() {
  const {data} = useLoaderData<typeof loader>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="pt-24 pb-10 md:pb-8">
      <div className="con">
        <div className="h-[540px] md:h-[520px] relative">
          {data?.image?.reference?.image && (
            <Image
              data={data.image.reference.image}
              className="w-full h-full object-cover object-center rounded-lg hidden md:block"
            />
          )}
          {data?.imageM?.reference?.image && (
            <Image
              data={data.imageM.reference.image}
              className="w-full h-full object-cover object-center rounded-lg block md:hidden"
            />
          )}
          <div className="absolute inset-0 flex justify-end items-end p-5">
            <p className="text-cream">{data?.text?.value || ''}</p>
          </div>
        </div>
        <div className="mt-12 md:mt-14 space-y-16">
          {data?.collections?.references &&
            flattenConnection(data.collections.references).map(
              (collectionData) => {
                const products = isMobile
                  ? flattenConnection(collectionData.products).slice(0, 2)
                  : flattenConnection(collectionData.products).slice(0, 3);

                const gridImageSize = parseInt(
                  collectionData.gridImageSize?.value || '0',
                );

                if (!isMobile && gridImageSize > 0 && products.length < 3) {
                  while (products.length < 3) {
                    products.push(products[0]);
                  }
                }

                return (
                  <div key={collectionData.handle}>
                    <div className="flex justify-between">
                      <h5>{collectionData.title}</h5>
                      <Link
                        to={`/collections/${collectionData.handle}`}
                        className="button bg-transparent border border-noir rounded-full py-3"
                      >
                        see all
                      </Link>
                    </div>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-x-1 md:gap-x-4">
                      {products.map((product, index) => {
                        if (index > 2) return null;
                        if (
                          isMobile ||
                          (!isMobile && !gridImageSize) ||
                          (!isMobile &&
                            gridImageSize &&
                            !collectionData.gridImage?.reference?.image)
                        )
                          return (
                            <ProductItemV1
                              product={product}
                              key={`${product.handle}_${index}`}
                            />
                          );
                        else {
                          if (
                            (gridImageSize === 2 && index === 0) ||
                            (gridImageSize === 1 && index === 2)
                          ) {
                            products.push(product);
                            return (
                              <div
                                key={`${product.handle}_${index}`}
                                className={
                                  gridImageSize === 1
                                    ? 'col-start-3 col-end-4'
                                    : 'col-start-1 col-end-3'
                                }
                              >
                                <Image
                                  data={
                                    collectionData!.gridImage!.reference!.image!
                                  }
                                  className="rounded-lg"
                                  sizes="66vw"
                                />
                              </div>
                            );
                          }
                          if (gridImageSize === 2 && index === 1) return null;
                          return (
                            <ProductItemV1
                              product={product}
                              key={`${product.handle}_${index}`}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              },
            )}
        </div>
      </div>
    </div>
  );
}
