"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "../services/locale";
import BinIcon from "./Icons/BinIcon";
import LightBulbIcon from "./Icons/LightBulbIcon";

const Navbar = () => {
  const changeLanguage = (value: "en" | "es") => {
    const locale = value as Locale;
    setUserLocale(locale);
  };

  return (
    <nav className="flex justify-between w-screen max-w-[100vw] fixed top-0 left-0 right-0 p-4 lg:p-6 2xl:py-8">
      <BinIcon />
      <div className="flex">
        <span onClick={() => changeLanguage("en")}>en</span>
        <span onClick={() => changeLanguage("es")}>es</span>
      </div>
      <LightBulbIcon />
    </nav>
  );
};

export default Navbar;
