import { twMerge } from "tailwind-merge";

const CalendarMarks = ({
  boxStyles,
  containerStyles,
}: {
  boxStyles?: string;
  containerStyles?: string;
}) => {
  return (
    <div
      className={twMerge(
        "absolute -right-8 lg:-right-11 top-0 bottom-0 grid grid-rows-9 items-end",
        containerStyles
      )}
    >
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <div
            key={index}
            className={twMerge(
              "flex justify-center items-center text-sm text-accent relative",
              boxStyles
            )}
          >
            {(index + 1) * 10}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarMarks;
