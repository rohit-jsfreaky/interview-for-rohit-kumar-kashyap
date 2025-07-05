import { NavbarLogo } from "@/constants/images";
const Navbar = () => {
  return (
    <div className="w-full h-20 bg-white shadow flex justify-center items-center">
      <img src={NavbarLogo} alt="" className="h-10"/>
    </div>
  );
};

export default Navbar;
