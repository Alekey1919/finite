"use client";

import { setUserLocale } from "../services/locale";
import BinIcon from "./Icons/BinIcon";
import LightBulbIcon from "./Icons/LightBulbIcon";
import { useLocale } from "next-intl";

const Navbar = () => {
  const locale = useLocale();

  return (
    <nav className="flex justify-between w-screen max-w-[100vw] fixed top-0 left-0 right-0 p-4 lg:p-6 2xl:py-8">
      <BinIcon />
      <div className="flex">
        <span
          className="uppercase text-xs cursor-pointer"
          onClick={() => setUserLocale(locale === "en" ? "es" : "en")}
        >
          {locale}
        </span>
      </div>
      <LightBulbIcon />
    </nav>
  );
};

export default Navbar;
