import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import "../../../../css/burger.css";

const Burger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const scrollListener = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <button
      className={twMerge(
        "burger -translate-x-3 lg:hidden !transition-none w-4 h-4",
        isOpen && "active"
      )}
      onClick={() => setIsOpen((curr) => !curr)}
    >
      <span className="sr-only">Open Menu</span>
      <svg className="burger-svg w-12 h-12" viewBox="0 0 100 100">
        <path
          className="line top"
          stroke="var(--accent)"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        ></path>
        <path
          className="line middle"
          stroke="var(--accent)"
          d="m 30,50 h 40"
        ></path>
        <path
          className="line bottom"
          stroke="var(--accent)"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        ></path>
      </svg>
    </button>
  );
};

export default Burger;
