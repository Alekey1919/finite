"use client";

import { useState } from "react";
import { setUserLocale } from "../services/locale";
import BinIcon from "./Icons/BinIcon";
import Burger from "./Icons/Burger";
import LightBulbIcon from "./Icons/LightBulbIcon";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import useMediaQueryState from "../hooks/useMediaQueryState";

const Navbar = () => {
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);

  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

  return (
    <nav
      className={twMerge(
        "flex flex-col space-y-4 h-screen fixed top-0 left-0 bottom-0 pl-4 lg:pl-4 2xl:pl-8 transition-colors max-h-[50vh]",
        isOpen && "bg-background"
      )}
      onMouseEnter={isTouch ? undefined : () => setIsOpen(true)}
      onMouseLeave={isTouch ? undefined : () => setIsOpen(false)}
    >
      <Burger setIsOpen={setIsOpen} isOpen={isOpen} />
      <div
        className={twMerge(
          "flex flex-col justify-center space-y-6 relative translate-y-5 transition-all",
          isOpen
            ? "w-screen lg:w-[unset]"
            : "-translate-x-[100px] lg:translate-x-0"
        )}
      >
        <LightBulbIcon />
        <div
          className="flex items-center justify-center uppercase text-xs cursor-pointer h-6 w-6"
          onClick={() => setUserLocale(locale === "en" ? "es" : "en")}
        >
          {locale}
        </div>
        <BinIcon />

        <div
          className={twMerge(
            "flex flex-col justify-center space-y-6 absolute left-0 lg:left-[unset] lg:right-0 top-0 -translate-x-full transition-all opacity-0 duration-500 whitespace-nowrap !mt-0 pointer-events-none",
            isOpen && "translate-x-10 lg:translate-x-[110%] opacity-100"
          )}
        >
          <span>Go Dark</span>
          <span>Switch language</span>
          <span>Delete birth date</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
