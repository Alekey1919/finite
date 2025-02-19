"use client";

import { useState } from "react";
import { setUserLocale } from "../../services/locale";
import BinIcon from "../Icons/BinIcon";
import Burger from "../Icons/Burger";
import LightBulbIcon from "../Icons/LightBulbIcon";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import useMediaQueryState from "../../hooks/useMediaQueryState";
import NavbarItem from "./NavbarItem";
import useColorTheme from "@/app/hooks/useColorTheme";
import useUserDataStore from "@/app/stores/userDataStore";

const Navbar = () => {
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);

  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

  const { switchColorTheme } = useColorTheme();

  const { birthDate, clearUserData } = useUserDataStore();

  return (
    <nav
      className={twMerge(
        "flex flex-col space-y-4 h-screen fixed top-0 left-0 bottom-0 pl-4 lg:pl-4 2xl:pl-8 transition-colors max-h-[50vh]",
        isOpen && "bg-background lg:w-[200px]"
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
        <NavbarItem
          icon={<LightBulbIcon />}
          text={"Go Dark"}
          isNavbarOpen={isOpen}
          onClick={() => switchColorTheme()}
        />
        <NavbarItem
          icon={<span className="w-6 h-6 text-center">{locale}</span>}
          text={"Change language"}
          isNavbarOpen={isOpen}
          onClick={() => setUserLocale(locale === "en" ? "es" : "en")}
        />
        <NavbarItem
          icon={<BinIcon />}
          text={"Delete birth date"}
          isNavbarOpen={isOpen}
          onClick={clearUserData}
          styles={!birthDate ? "opacity-0" : ""}
        />
      </div>
    </nav>
  );
};

export default Navbar;
