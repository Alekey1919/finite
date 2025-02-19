import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const NavbarItem = ({
  icon,
  text,
  onClick,
  isNavbarOpen,
  styles = "",
}: {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  isNavbarOpen: boolean;
  styles?: string;
}) => {
  return (
    <div
      className={twMerge("relative flex group cursor-pointer", styles)}
      onClick={onClick}
    >
      {icon}
      <span
        className={twMerge(
          isNavbarOpen
            ? "translate-x-4 opacity-100 whitespace-nowrap group-hover:text-primary"
            : "opacity-0"
        )}
        style={{ transition: "all 500ms, color 150ms" }}
      >
        {text}
      </span>
    </div>
  );
};

export default NavbarItem;
