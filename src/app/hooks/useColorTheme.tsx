import { useCallback, useEffect, useState } from "react";
import { ColorThemesEnum } from "../utils/autoDetectColorPreference";
import useThemeStore from "../stores/themeStore";
import { setCookie } from "../utils/cookies";

export const ColorPalette = {
  light: "#e9ecef",
  dark: "#2d3538",
  accent: "#a37a5c",
};

const useColorTheme = () => {
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  const { theme, setDarkMode, setLightMode } = useThemeStore();

  // Adding transition to all elements so that the color change is smooth
  // Clearing it afterwards
  const handleTransition = () => {
    const style = document.createElement("style");

    style.textContent = `* {
        transition: all 300ms ease-out !important;
      }`;

    document.head.appendChild(style);

    setTimeout(() => {
      document.head.removeChild(style);
    }, 2000); // Using 2s because texts take more time to change (honestly I have no idea why but it looks cool xd)
  };

  const changeColorVariables = useCallback((newTheme: ColorThemesEnum) => {
    const root = document.querySelector(":root") as HTMLElement;

    // This applies display none to the calendar so that the transition is smooth, otherwise it could lag the page too much
    document.body.classList.add("changing-theme");

    if (!root) return;

    const background =
      newTheme === ColorThemesEnum.Dark
        ? ColorPalette.dark
        : ColorPalette.light;
    const accent =
      newTheme === ColorThemesEnum.Dark
        ? ColorPalette.light
        : ColorPalette.dark;

    handleTransition();
    root?.style.setProperty("--background", background);
    root?.style.setProperty("--accent", accent);

    setCookie("theme", newTheme);

    fadeInCalendar();
  }, []);

  const fadeInCalendar = () => {
    const calendar = document.getElementById("calendar");

    if (!calendar) return document.body.classList.remove("changing-theme");

    setIsChangingTheme(true);

    setTimeout(() => {
      // Removing the class so that the calendar boxes are rendered
      document.body.classList.remove("changing-theme");
      // Add the fade-in class to the calendar so that it fades in
      calendar.classList.add("fade-in");

      setTimeout(() => {
        // Removing the fade-in class so that it is ready to perform the animation once we change the theme again
        calendar.classList.remove("fade-in");
        setIsChangingTheme(false);
      }, 500);
    }, 300);
  };

  const switchColorTheme = useCallback(
    (initialTheme?: ColorThemesEnum) => {
      if (isChangingTheme) return;

      let newTheme = ColorThemesEnum.Dark;

      if (initialTheme) {
        newTheme = initialTheme;
      } else {
        newTheme =
          theme === ColorThemesEnum.Dark
            ? ColorThemesEnum.Light
            : ColorThemesEnum.Dark;
      }

      if (newTheme === ColorThemesEnum.Dark) {
        setDarkMode();
      } else {
        setLightMode();
      }

      changeColorVariables(newTheme);
    },
    [isChangingTheme, theme, changeColorVariables, setDarkMode, setLightMode]
  );

  useEffect(() => {
    switchColorTheme(theme);
  }, []);

  return { switchColorTheme, theme };
};

export default useColorTheme;
