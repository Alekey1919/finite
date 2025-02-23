"use client";

import Calendar from "../components/calendar/Calendar";

const FamousDeaths = () => {
  return (
    <div className="flex flex-col justify-center space-y-10">
      <h1 className="title text-center">Famous deaths</h1>
      <Calendar />
    </div>
  );
};

export default FamousDeaths;
