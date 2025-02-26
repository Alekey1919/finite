"use client";

import { useEffect, useState } from "react";
import useUserDataStore from "./stores/userDataStore";
import BirthDateInput from "./components/calendar/BirthDateInput";
import LivedTime from "./components/calendar/LivedTime";
import Calendar, { CalendarTypesEnum } from "./components/calendar/Calendar";
import Quotes from "./components/Quotes";

const Page = () => {
  const [domReady, setDomReady] = useState(false);

  const { birthDate } = useUserDataStore();

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!domReady) return <></>;

  if (!birthDate) {
    return <BirthDateInput />;
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col space-y-16">
        <LivedTime />
        <Calendar calendarType={CalendarTypesEnum.Personal} />
      </div>
      <Quotes />
    </div>
  );
};

export default Page;
