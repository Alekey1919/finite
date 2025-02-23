import React, { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { TimeMeasurementsEnum } from "./Calendar";

const TimeMeasurementSelector = ({
  timeMeasurement,
  setTimeMeasurement,
}: {
  timeMeasurement;
  setTimeMeasurement: Dispatch<SetStateAction<TimeMeasurementsEnum>>;
}) => {
  const t = useTranslations();

  const buttonsData = [
    { text: t("weeks"), value: TimeMeasurementsEnum.Weeks },
    { text: t("months"), value: TimeMeasurementsEnum.Months },
    { text: t("years"), value: TimeMeasurementsEnum.Years },
  ];

  return (
    <div className="flex space-x-8 justify-center text-primary text-base 2xl:text-xl">
      {buttonsData.map((data, index) => {
        return (
          <button
            className={data.value === timeMeasurement ? "underline" : ""}
            onClick={() => setTimeMeasurement(data.value)}
            key={index}
          >
            {data.text}
          </button>
        );
      })}
    </div>
  );
};

export default TimeMeasurementSelector;
