import useUserDataStore from "@/app/stores/userDataStore";
import { twMerge } from "tailwind-merge";

const BinIcon = () => {
  const { birthDate, clearUserData } = useUserDataStore();

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="binIconTitle"
      stroke="var(--accent)"
      fill="var(--accent)"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={twMerge(
        "w-6 2xl:w-8 transition-opacity duration-500",
        !birthDate && "opacity-0"
      )}
      onClick={clearUserData}
    >
      <path
        d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"
        stroke="var(--accent)"
      />
    </svg>
  );
};

export default BinIcon;
