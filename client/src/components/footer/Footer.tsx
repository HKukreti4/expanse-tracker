import Container from "../Containers/Container";

const Footer = () => {
  return (
    <Container>
      <div className="footer bg-secondary-500/50 mt-4 pt-8  rounded-xl mb-2 overflow-hidden">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-y-8 lg:grid-cols-3 mx-8 py-4 items-start gap-4  text-sm md:text-xl ">
          <div className="useFullLinks  md:px-8">
            <h3 className="capitalize text-md text-primary-400 font-semibold mb-2 ">
              Site Map
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Home</li>
              <li>About </li>
              <li>Tools</li>
            </ul>
          </div>
          <div className="useFullLinks  md:px-8">
            <h3 className="capitalize text-md text-primary-400 font-semibold mb-2 ">
              Resources
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Guides</li>
              <li>Privary & Terms</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="useFullLinks  md:px-8">
            <h3 className="capitalize text-md text-primary-400 font-semibold mb-2 ">
              Features
            </h3>
            <ul className="flex flex-col gap-2 text-sm ">
              <li>Dashboard</li>
              <li>Reports</li>
              <li>FAQ's</li>
            </ul>
          </div>
        </div>

        <p className="text-center mt-5 py-4 bg-secondary-500/10 w-full">
          Copyright &copy; | All rights reserved{" "}
        </p>
      </div>
    </Container>
  );
};

export default Footer;
