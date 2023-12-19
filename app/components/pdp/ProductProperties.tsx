import {Image} from '@shopify/hydrogen';
import {ProductPropertyItemFragment} from 'storefrontapi.generated';

export default function ProductProperties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-[10px]"></div>
  );
}

const ProductPropertyItem = ({data}: {data: ProductPropertyItemFragment}) => {
  return (
    <div className="bg-cream rounded-lg p-7">
      <div className="small text-16 md:text-xl text-dusk">
        {data.title?.value || ''}
      </div>
      <div className="flex mt-20 md:mt-24 justify-center">
        {data.image?.reference?.image && (
          <Image
            data={data.image.reference.image}
            className="w-[140px] md:w-[200px]"
          />
        )}
      </div>
      <h5 className="mt-10 text-center whitespace-pre-wrap">
        {data.desc?.value || ''}
      </h5>
    </div>
  );
};
