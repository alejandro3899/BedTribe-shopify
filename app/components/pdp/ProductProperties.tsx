import {Image} from '@shopify/hydrogen';
import {ProductPropertyItemFragment} from 'storefrontapi.generated';

export default function ProductProperties({
  data,
}: {
  data: ProductPropertyItemFragment[];
}) {
  return (
    <div className="con px-5 md:px-10 py-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-[10px]">
        {data.map((property) => (
          <ProductPropertyItem data={property} key={property.id} />
        ))}
      </div>
    </div>
  );
}

const ProductPropertyItem = ({data}: {data: ProductPropertyItemFragment}) => {
  return (
    <div className="bg-cream rounded-lg p-7 pb-24 md:pb-20">
      <div className="small text-16 md:text-xl text-dusk normal-case">
        {data.title?.value || ''}
      </div>
      <div className="flex mt-20 md:mt-24 justify-center">
        <div className="w-[140px] md:w-[200px]">
          {data.image?.reference?.image && (
            <Image data={data.image.reference.image} />
          )}
        </div>
      </div>
      <h5 className="mt-10 text-center whitespace-pre-wrap">
        {data.desc?.value || ''}
      </h5>
    </div>
  );
};
