import {useLoaderData} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@remix-run/server-runtime';
import {MetaFunction} from '@shopify/remix-oxygen';
import {CONTACT_FORM_QUERY} from '~/queries/contact-us';
import dropdown from '~/assets/Dropdown.svg';
import {Image} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{title: 'Bedtribe | Contact Us'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {metaobject} = await storefront.query(CONTACT_FORM_QUERY);

  return json({
    data: metaobject,
  });
}

export default function ContactUs() {
  const {data} = useLoaderData<typeof loader>();

  if (!data) return null;

  return (
    <div className="pt-24 md:pt-[88px] pb-8 md:pb-6">
      <div className="con">
        <div className="relative">
          <div className="absolute inset-0">
            {data.image?.reference?.image && (
              <Image
                data={data.image.reference.image}
                className="w-full h-full object-cover rounded-xl object-center hidden md:block"
              />
            )}
            {data.image_m?.reference?.image && (
              <Image
                data={data.image_m.reference.image}
                className="w-full h-full object-cover rounded-xl object-center block md:hidden"
              />
            )}
          </div>
          <div className="px-2 pb-3 pt-80 md:p-[60px] rounded-xl">
            <div className="contact-form rounded-xl w-full md:w-8/12 md:max-w-[592px] relative py-7 px-3 md:py-9 md:px-7">
              <div className="relative z-10">
                <h4 className="text-center text-cream">
                  {data.title?.value || ''}
                </h4>
                <p className="text-cream mt-3 text-sm text-center">
                  {data.desc?.value || ''}
                </p>
                <form>
                  <div className="mt-10 space-y-3">
                    <div className="grid grid-cols-2 gap-x-1">
                      <input
                        type="text"
                        name="fistName"
                        id="firstName"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                      />
                    </div>
                    <label htmlFor="subject" className="relative block">
                      {data.subjects?.value && (
                        <select name="subject" id="subject">
                          <option value="">Select subject</option>
                          {(JSON.parse(data.subjects.value) as string[]).map(
                            (subject) => (
                              <option value={subject}>{subject}</option>
                            ),
                          )}
                        </select>
                      )}
                      <img
                        src={dropdown}
                        className="absolute right-5 top-1/2 -translate-y-1/2"
                      />
                    </label>
                    <div>
                      <textarea
                        name="message"
                        id="message"
                        rows={14}
                        className="resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <button className="bg-noir text-cream rounded-full w-full normal-case">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
