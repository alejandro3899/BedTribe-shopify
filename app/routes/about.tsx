import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';
import about3 from '../assets/about3.png';
import home1 from '../assets/home1.png';
import home2 from '../assets/home2.png';
import home3 from '../assets/home3.png';
import home4 from '../assets/home4.png';
import home5 from '../assets/home5.svg';

export default function About() {
  return (
    <>
      <div className="con">
        <div className="pt-14 pb-7 md:pt-16 md:pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-16">
            <div>
              <img src={about1} alt="about1 img" className="rounded-lg" />
              <h3 className="mt-3 md:mt-5">
                We’ve always been passionate about having high quality sleep.
                Bedtribe was birthed from the idea of wanting to provide
                accessible premium sleep products for the community.
              </h3>
            </div>
            <div>
              <div className="w-full flex justify-end md:justify-start">
                <img
                  src={about2}
                  alt="about2 img"
                  className="w-9/12 md:max-w-[453px] rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-7 md:pt-16 pb-20 md:pb-40">
          <img src={about3} alt="about3" className="rounded-lg" />

          <div className="max-w-[237px] md:max-w-[454px] mx-auto mt-8 md:mt-20">
            <h1 className="mb-2 md:mb-7">Defining a new way to sleep</h1>

            <p>
              At a certain point in recent years, our culture started to equate
              sleep with being idle and slothful. Activities like buying the
              best sheets, massage, and blackout curtains in your room are
              singular endeavors that might be construed as extreme indulgence.
            </p>
            <br />
            <p>
              But as our hyperconnected world faces challenges we could never
              have predicted, it is clear that we cannot feel a real sense of
              tranquility without acknowledging that in order to sleep well and
              thrive, we need to look beyond what we currently know and are
              accustomed to.
            </p>
          </div>
        </div>
      </div>
      <div className="con bg-cream">
        <div className="py-15 md:pt-32 md:pb-28 ">
          <h2 className="pb-6 md:pb-13">Our Bamboo Sheets</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[60px] md:gap-x-10">
            <div className="flex flex-col-reverse	md:flex-col gap-4 md:gap-5">
              <div className="md:pr-9">
                <span className="px-4 py-2 border border-black rounded-[20px] text-[18px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.4px] leading-none inline-block">
                  01
                </span>

                <h6 className="mt-2 md:mt-3">
                  Our sheets are naturally hypoallergenic and antibacterial.
                  Bamboo repels bacteria and are resistant to odours.
                </h6>
              </div>

              <img src={home1} alt="home1" className="rounded-lg" />
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              <img src={home2} alt="home2" className="rounded-lg" />

              <div className="md:pr-9">
                <span className="px-4 py-2 border border-black rounded-[20px] text-[18px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.4px] leading-none inline-block">
                  02
                </span>

                <h6 className="mt-2 md:mt-3">
                  Our sheets are naturally hypoallergenic and antibacterial.
                  Bamboo repels bacteria and are resistant to odours.
                </h6>
              </div>
            </div>

            <div className="flex flex-col-reverse	md:flex-col gap-4 md:gap-5">
              <div className="md:pr-9">
                <span className="px-4 py-2 border border-black rounded-[20px] text-[18px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.4px] leading-none inline-block">
                  03
                </span>

                <h6 className="mt-2 md:mt-3">
                  Our sheets are naturally hypoallergenic and antibacterial.
                  Bamboo repels bacteria and are resistant to odours.
                </h6>
              </div>

              <img src={home3} alt="home3" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="con">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-8/12">
            <img src={home4} alt="home4" className="rounded-l-lg" />
          </div>
          <div className="bg-cream w-full md:w-4/12 py-6 md:pt-10 lg:pt-20 md:pb-14 pl-6 pr-9 md:px-8 lg:px-[60px] flex flex-wrap content-between gap-40 md:gap-0 rounded-r-lg">
            <h5>
              ”One of the best pillows I’ve tried. Hope to see more colours in
              the future!”
            </h5>

            <p className="text-20 leading-none">Andy Kong</p>
          </div>
        </div>
      </div>

      <div className="con">
        <div className="pt-20 pb-10 flex flex-col items-center gap-16 md:gap-24">
          <div className="px-16 md:px-0 flex flex-col items-start md:items-center gap-7 md:gap-12">
            <div className="flex items-center gap-1 md:gap-3">
              <img
                src={home5}
                alt="home5"
                className="w-[38px] h-[38px] md:w-[50px] md:h-[50px] lg:w-[64px] lg:h-[64px] p-[5px] md:p-2"
              />
              <div className="display-d whitespace-break-spaces md:whitespace-nowrap">
                30 Day Trial
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <img
                src={home5}
                alt="home5"
                className="w-[38px] h-[38px] md:w-[50px] md:h-[50px] lg:w-[64px] lg:h-[64px] p-[5px] md:p-2"
              />
              <div className="display-d whitespace-break-spaces md:whitespace-nowrap">
                Safe Payment Methods
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <img
                src={home5}
                alt="home5"
                className="w-[38px] h-[38px] md:w-[50px] md:h-[50px] lg:w-[64px] lg:h-[64px] p-[5px] md:p-2"
              />
              <div className="display-d whitespace-break-spaces md:whitespace-nowrap">
                Free, Easy Returns
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <img
                src={home5}
                alt="home5"
                className="w-[38px] h-[38px] md:w-[50px] md:h-[50px] lg:w-[64px] lg:h-[64px] p-[5px] md:p-2"
              />
              <div className="display-d whitespace-break-spaces md:whitespace-nowrap">
                Local Support
              </div>
            </div>
          </div>

          <div className="w-full md:w-fit text-center px-6 py-4 border border-black rounded-[100px] leading-none">
            Learn more
          </div>
        </div>
      </div>
    </>
  );
}
