"use client";

import Calendar, { CalendarTypesEnum } from "../components/calendar/Calendar";

const FamousDeaths = () => {
  return (
    <div className="flex flex-col justify-center space-y-10 layout">
      <h1 className="title text-center">Famous deaths</h1>
      <Calendar calendarType={CalendarTypesEnum.FamousDeaths} />
    </div>
  );
};

export default FamousDeaths;
