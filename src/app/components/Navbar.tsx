"use client";

import useColorTheme from "../hooks/useColorTheme";

const Navbar = () => {
  const { switchColorTheme } = useColorTheme();

  return (
    <nav className="flex justify-end">
      <span onClick={switchColorTheme}>Theme</span>
    </nav>
  );
};

export default Navbar;
