import { TiTick } from "react-icons/ti";
import Button from "../buttons/Button";
import Container from "../Containers/Container";

const PricingSection = () => {
  return (
    <Container>
      <div className=" bg-secondary-800/50 rounded-xl py-4 mt-4 mx-auto ">
        <h2 className="text-primary-400 font-bold text-2xl md:text-4xl text-center">
          Pricing
        </h2>
        <p className="text-center">Simple and Affordable Pricing</p>
        <div className="flex flex-col md:flex-row gap-4 my-8   mx-4 md:px-6 m-auto">
          <div className="Basic bg-secondary-500/50 rounded-md p-6 flex flex-1 flex-col gap-2">
            <p className="text-primary-400 text-2xl font-bold">Free</p>
            <h3 className="text-4xl text-primary-500 font-bold">
              ₹0 <span className="text-xl text-white">per month</span>
            </h3>
            <p className="line-clamp-1">Great for trying our smart system</p>
            <Button className="rounded-md cursor-pointer">
              Start for free
            </Button>
            <div className="fetures ">
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Account Aggregation</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Expanse Tracking</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Budgeting Tools</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Basic Security</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span>Dashboard Control</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="Standard bg-secondary-500/50 rounded-md p-6 flex flex-1 flex-col gap-2">
            <p className="text-primary-400 text-2xl font-bold">Standard</p>
            <h3 className="text-4xl text-primary-500 font-bold">
              ₹99 <span className="text-xl text-white">per month</span>
            </h3>
            <p className="line-clamp-1">Great for personal use and start ups</p>
            <Button className="rounded-md cursor-pointer">
              Sign up with Standard
            </Button>
            <div className="fetures ">
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Everything in free</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span>Advance Expanse Tracking with AI</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Advance Budgeting Tools</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Enhanced Security</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span>Customizable Dashboard </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="Advanced bg-secondary-500/50 rounded-md p-6 flex flex-1 flex-col gap-2">
            <p className="text-primary-400 text-2xl font-bold">Enterprise</p>
            <h3 className="text-4xl text-primary-500 font-bold">
              ₹199 <span className="text-xl text-white">per month</span>
            </h3>
            <p className="line-clamp-1">
              Best for professionals and large teams
            </p>
            <Button className="rounded-md cursor-pointer">
              Sign Up with Enterprise
            </Button>
            <div className="fetures ">
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Account Aggregation</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Expanse Tracking</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Budgeting Tools</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span> Basic Security</span>
                </li>
                <li className="flex items-center text-md">
                  <span className="text-primary-400">
                    <TiTick />
                  </span>
                  <span>Dashboard Control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PricingSection;
