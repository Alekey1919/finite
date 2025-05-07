import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { TimeMeasurementsEnum } from "./Calendar";

const CalendarMarks = ({
  boxStyles,
  containerStyles,
  timeMeasurement,
}: {
  boxStyles?: string;
  containerStyles?: string;
  timeMeasurement: TimeMeasurementsEnum;
}) => {
  const t = useTranslations();

  return (
    <div
      className={twMerge(
        "absolute -right-8 lg:-right-11 top-0 bottom-0 grid grid-rows-9 items-end",
        containerStyles
      )}
    >
      <div
        className={twMerge(
          "hidden sm:block absolute -top-6 left-0 right-0 mx-auto text-xs",
          timeMeasurement !== TimeMeasurementsEnum.Years && "-translate-x-1/2"
        )}
      >
        {t("years")}
      </div>
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
