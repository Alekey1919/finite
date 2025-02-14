"use client";

import useColorTheme from "../hooks/useColorTheme";

const Navbar = () => {
  const { switchColorTheme } = useColorTheme();

  return (
    <nav className="flex justify-end fixed top-0 left-0 right-0">
      <span onClick={() => switchColorTheme()}>Theme</span>
    </nav>
  );
};

export default Navbar;
