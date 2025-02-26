"use client";

import Calendar, { CalendarTypesEnum } from "../components/calendar/Calendar";

const LifeMilestones = () => {
  return (
    <div className="flex flex-col justify-center space-y-10">
      <h1 className="title text-center">Famous deaths</h1>
      <Calendar calendarType={CalendarTypesEnum.LifeMilestones} />
    </div>
  );
};

export default LifeMilestones;
