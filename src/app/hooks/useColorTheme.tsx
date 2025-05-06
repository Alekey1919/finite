import { useCallback, useState } from "react";
import { ColorThemesEnum } from "../utils/autoDetectColorPreference";
import { setCookie } from "../utils/cookies";
import { useTheme } from "next-themes";

const useColorTheme = () => {
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  const { theme, setTheme } = useTheme();

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

  const changeColorVariables = useCallback(
    ({
      newTheme,
      animate,
    }: {
      newTheme: ColorThemesEnum;
      animate: boolean;
    }) => {
      const root = document.querySelector(":root") as HTMLElement;

      // This applies display none to the calendar so that the transition is smooth, otherwise it could lag the page too much
      document.body.classList.add("changing-theme");

      if (!root) return;

      if (animate) {
        handleTransition();
      }

      setCookie("theme", newTheme);

      fadeInCalendar();
    },
    []
  );

  const fadeInCalendar = () => {
    const elementsToFade = document.getElementsByClassName(
      "fade-with-theme-change"
    );

    if (!elementsToFade.length) {
      return document.body.classList.remove("changing-theme");
    }

    setIsChangingTheme(true);

    setTimeout(() => {
      // Removing the class so that the calendar boxes are rendered
      document.body.classList.remove("changing-theme");
      // Add the fade-in class to the elements so that they fades in

      for (let i = 0; i < elementsToFade.length; i++) {
        const element = elementsToFade[i] as HTMLElement;
        element.classList.add("fade-in");
      }

      setTimeout(() => {
        // Removing the fade-in class so that they're ready to perform the animation once we change the theme again
        for (let i = 0; i < elementsToFade.length; i++) {
          const element = elementsToFade[i] as HTMLElement;
          element.classList.remove("fade-in");
        }

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

      setTheme(newTheme === ColorThemesEnum.Dark ? "dark" : "light");

      changeColorVariables({ newTheme, animate: initialTheme === undefined });
    },
    [isChangingTheme, theme, changeColorVariables, setTheme]
  );

  return { switchColorTheme, theme };
};

export default useColorTheme;
