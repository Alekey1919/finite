"use client";

import { useEffect } from "react";
import Calendar, { CalendarTypesEnum } from "../components/calendar/Calendar";
import useRegionStore from "../stores/regionStore";
import Tooltip from "../components/calendar/Tooltip";

const LifeMilestones = () => {
  const { region, setRegion } = useRegionStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.navigator.language === "es-AR"
    ) {
      setRegion("ar");
    } else {
      setRegion("us");
    }
  }, [setRegion]);

  return (
    <div className="flex flex-col justify-center space-y-10">
      <h1 className="title text-center">Life milestones</h1>
      <Calendar calendarType={CalendarTypesEnum.LifeMilestones} />

      <div className="relative flex mx-auto group">
        <span
          className="uppercase cursor-pointer text-accent hover:text-primary transition-colors duration-300"
          onClick={() => setRegion(region === "us" ? "ar" : "us")}
        >
          {region}
        </span>
        <Tooltip text={"Change region"} />
      </div>
    </div>
  );
};

export default LifeMilestones;
