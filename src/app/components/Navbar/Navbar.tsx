"use client";

import { useState } from "react";
import { setUserLocale } from "../../services/locale";
import BinIcon from "../Icons/BinIcon";
import Burger from "../Icons/Burger";
import LightBulbIcon from "../Icons/LightBulbIcon";
import { useLocale, useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import useMediaQueryState from "../../hooks/useMediaQueryState";
import NavbarItem from "./NavbarItem";
import useColorTheme from "@/app/hooks/useColorTheme";
import useUserDataStore from "@/app/stores/userDataStore";
import { useTheme } from "next-themes";
import CoffinIcon from "../Icons/CoffinIcon";
import Link from "next/link";
import { RoutesEnum } from "@/app/enums/RoutesEnum";
import CalendarCheck from "../Icons/CalendarCheck";
import MyCalendarIcon from "../Icons/MyCalendarIcon";
import useDefaultLanguage from "@/app/hooks/useDefaultLanguage";

const Navbar = () => {
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);

  const { theme } = useTheme();
  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

  const { switchColorTheme } = useColorTheme();

  const { birthDate, clearUserData } = useUserDataStore();

  const t = useTranslations();

  useDefaultLanguage();

  return (
    <nav
      className={twMerge(
        "flex flex-col h-fit space-y-4 fixed top-0 left-0 bottom-0 pl-4 lg:pl-4 2xl:pl-8 transition-colors pb-10",
        isOpen && "bg-background lg:w-[250px] z-10"
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
        <Link href={RoutesEnum.Home}>
          <NavbarItem
            icon={<MyCalendarIcon />}
            text={t("yourLife")}
            isNavbarOpen={isOpen}
          />
        </Link>
        <Link href={RoutesEnum.FamousDeaths}>
          <NavbarItem
            icon={<CoffinIcon />}
            text={t("famousDeaths")}
            isNavbarOpen={isOpen}
          />
        </Link>
        <Link href={RoutesEnum.LifeMilestones}>
          <NavbarItem
            icon={<CalendarCheck />}
            text={t("lifeMilestones.title")}
            isNavbarOpen={isOpen}
          />
        </Link>
        <NavbarItem
          icon={<LightBulbIcon />}
          text={t(theme === "light" ? "goDark" : "goLight")}
          isNavbarOpen={isOpen}
          onClick={() => switchColorTheme()}
        />
        <NavbarItem
          icon={
            <span className="w-6 h-6 2xl:w-8 2xl:h-8 text-center flex items-center justify-center">
              {locale}
            </span>
          }
          text={t("switchLanguage")}
          isNavbarOpen={isOpen}
          onClick={() => setUserLocale(locale === "en" ? "es" : "en")}
        />
        <NavbarItem
          icon={<BinIcon />}
          text={t("deleteBirthDate")}
          isNavbarOpen={isOpen}
          onClick={clearUserData}
          styles={!birthDate ? "opacity-0 pointer-events-none" : ""}
        />
      </div>
    </nav>
  );
};

export default Navbar;
