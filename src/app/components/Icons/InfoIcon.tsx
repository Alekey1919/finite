import { twMerge } from "tailwind-merge";

const InfoIcon = ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) => {
  return (
    <svg
      fill="none"
      onClick={onClick}
      className={twMerge(
        "w-6 2xl:w-8 transition-opacity duration-500 cursor-pointer",
        className
      )}
    >
      <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="1.5" />
      <path
        d="M12 17V11"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="1"
        cy="1"
        r="1"
        transform="matrix(1 0 0 -1 11 9)"
        fill="var(--accent)"
      />
    </svg>
  );
};

export default InfoIcon;
