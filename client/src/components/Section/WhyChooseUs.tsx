import { BiCaretRight } from "react-icons/bi";
import Container from "../Containers/Container";

const WhyChooseUs = () => {
  return (
    <Container>
      <section className="feture-section bg-secondary-500/40 rounded-xl mt-2 py-6 px-6 relative overflow-hidden">
        <div className="blur-icon absolute top-0 left-0 w-60 h-60 bg-gradient-to-b from-yellow-400/70 to-blue-950 blur-3xl rounded-full -z-1"></div>
        <div className="blur-icon absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-b from-yellow-400/70 to-blue-950 blur-3xl rounded-full -z-1"></div>
        <h2 className="text-center text-4xl mt-6 py-2 capitalize text-primary-400 font-bold">
          Why Choose us
        </h2>
        <p className="text-center">
          Want to track your expanses with ease stay with us
        </p>
        <div className="flex p-6">
          <div>
            <ul className="flex flex-col gap-2 text-xl ">
              <li className="flex gap-2 items-center">
                <span className="text-primary-400">
                  <BiCaretRight />
                </span>
                256 Bit Encryption
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary-400">
                  <BiCaretRight />
                </span>
                Mobile Friendly
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary-400">
                  <BiCaretRight />
                </span>
                No hidden charges
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary-400">
                  <BiCaretRight />
                </span>
                Smart AI assistant
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary-400">
                  <BiCaretRight />
                </span>
                Trusted by 5000+ users
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary-400">
                  <BiCaretRight />
                </span>
                Fast , Secure and Easy to use
              </li>
            </ul>
          </div>
          <div>{/* <img src="" alt="" /> */}</div>
        </div>
      </section>
    </Container>
  );
};

export default WhyChooseUs;
