import { RiBillLine } from "react-icons/ri";
import Container from "../Containers/Container";
import { LuChartSpline } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa";
import { MdDocumentScanner, MdSpaceDashboard } from "react-icons/md";
import { GrInsecure } from "react-icons/gr";

const FeatureSection = () => {
  return (
    <Container>
      <section className="feture-section bg-secondary-500/40 rounded-xl mt-2 py-6 relative overflow-hidden ">
        <h2 className="text-center text-4xl mt-6  text-primary-400 font-bold">
          Features
        </h2>
        <p className="text-center">Explore our feature with ease and secure</p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  py-12 md:px-8 px-2 gap-2 md:gap-8  ">
          <div className="card flex gap-2 flex-col  md:flex-row items-start md:items-center  p-4  bg-secondary-500 rounded-md  ">
            <div className="icon text-5xl text-gray-400">
              <RiBillLine />
            </div>
            <div className="text-md md:text-xl">
              <h2 className="text-xl md:text-2xl font-medium text-primary-400 ">
                Expanse Tracking
              </h2>
              <p>Easily recored and categorize your expanses</p>
            </div>
          </div>
          <div className="card flex gap-2 flex-col  md:flex-row items-start md:items-center  p-4  bg-secondary-500 rounded-md  ">
            <div className="icon text-5xl text-gray-400">
              <LuChartSpline />{" "}
            </div>
            <div className="text-md md:text-xl">
              <h2 className="text-xl md:text-2xl font-medium text-primary-400 ">
                Smart Budgeting
              </h2>
              <p>Set Budgets and monitor your spending habits with AI</p>
            </div>
          </div>
          <div className="card flex gap-2 flex-col  md:flex-row items-start md:items-center  p-4  bg-secondary-500 rounded-md  ">
            <div className="icon text-5xl text-gray-400">
              <FaChartPie />
            </div>
            <div className="text-md md:text-xl">
              <h2 className="text-xl md:text-2xl font-medium text-primary-400 ">
                Reporting
              </h2>
              <p>
                Generate detailed reports to gain insights into your expanses
              </p>
            </div>
          </div>
          <div className="card flex gap-2 flex-col  md:flex-row items-start md:items-center  p-4  bg-secondary-500 rounded-md  ">
            <div className="icon text-4xl  md:text-5xl text-gray-400">
              <MdDocumentScanner />
            </div>
            <div className="text-md md:text-xl">
              <h2 className="text-xl md:text-2xl font-medium text-primary-400 ">
                Receipt Scanning
              </h2>
              <p>Scan receipts and store them digitallly for easy access</p>
            </div>
          </div>
          <div className="card flex gap-2 flex-col  md:flex-row items-start md:items-center  p-4  bg-secondary-500 rounded-md  ">
            <div className="icon text-5xl text-gray-400">
              <MdSpaceDashboard />
            </div>
            <div className="text-md md:text-xl">
              <h2 className="text-xl md:text-2xl font-medium text-primary-400 ">
                Advance Dashboard
              </h2>
              <p>Control over each transcation using dashboard</p>
            </div>
          </div>
          <div className="card flex gap-2 flex-col  md:flex-row items-start md:items-center  p-4  bg-secondary-500 rounded-md  ">
            <div className="icon text-5xl text-gray-400">
              <GrInsecure />
            </div>
            <div className="text-md md:text-xl">
              <h2 className="text-xl md:text-2xl font-medium text-primary-400 ">
                Fast and Secure
              </h2>
              <p>
                Track and manage expanse in realtime with fast and secure system{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FeatureSection;
