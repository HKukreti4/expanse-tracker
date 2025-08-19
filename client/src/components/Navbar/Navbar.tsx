import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import Container from "../Containers/Container";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="flex justify-between bg-secondary-500/50 mt-1 rounded-2xl p-3 items-center backdrop-blur-3xl">
        <div className="logo-section ">
          <h2 className="text-2xl ">Expanse</h2>
        </div>
        <div className="menu-bars flex items-center gap-5">
          <ul className="flex gap-4 ">
            <li>Home</li>
            <li>About</li>
          </ul>
          <Button
            className="bg-primary-500 rounded-full px-4 py-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
