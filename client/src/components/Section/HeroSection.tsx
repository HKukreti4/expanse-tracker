import Container from "../Containers/Container";

const HeroSection = () => {
  return (
    <Container>
      <div className="hero  dark:bg-secondary-500 h-[80vh] mt-2 rounded-2xl flex justify-center items-center relative overflow-hidden">
        <div className="blur-icon absolute top-0 left-0 w-60 h-60 bg-gradient-to-b from-primary-400/70 to-blue-950 blur-3xl rounded-full -z-1"></div>
        <div className="blur-icon absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-b from-primary-400/70 to-blue-950 blur-3xl rounded-full -z-1"></div>
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-400">
            Expanse Management System
          </h2>
          <p className="text-md md:text-2xl text-gray-400">
            Simplify your expanse management <br /> Powered with{" "}
            <span className="text-primary-400 font-bold"> AI</span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
