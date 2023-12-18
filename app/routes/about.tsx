import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';
import about3 from '../assets/about3.png';

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
    </>
  );
}
