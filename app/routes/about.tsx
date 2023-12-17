import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';

export default function About() {
  return (
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

      <div className=""></div>
    </div>
  );
}
