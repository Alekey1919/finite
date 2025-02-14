"use client";

import BinIcon from "./Icons/BinIcon";
import LightBulbIcon from "./Icons/LightBulbIcon";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-screen max-w-[100vw] fixed top-0 left-0 right-0 p-4 lg:p-6 2xl:py-8">
      <BinIcon />
      <LightBulbIcon />
    </nav>
  );
};

export default Navbar;
