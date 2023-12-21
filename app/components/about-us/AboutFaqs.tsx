import {flattenConnection} from '@shopify/hydrogen';
import {AboutFaqsQuery} from 'storefrontapi.generated';
import faqHeader from '~/assets/faq.svg';
import faqHeaderM from '~/assets/faq-m.svg';
import FaqItem from '../global/FaqItem';

export default function AboutFaqs({data}: {data: AboutFaqsQuery}) {
  if (!data.metaobject?.items?.references) return null;

  return (
    <div className="con md:px-[60px] py-[60px] md:py-20">
      <div className="w-full relative">
        <img
          src={faqHeader}
          alt="faq vector"
          className="w-full hidden md:block"
        />
        <img
          src={faqHeaderM}
          alt="faq vector"
          className="w-full block md:hidden"
        />
        <div className="mt-24 space-y-3">
          {flattenConnection(data.metaobject.items.references).map((faq) => (
            <FaqItem data={faq} key={faq.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
