"use client";

import { useEffect, useState } from "react";
import BirthDateInput from "./components/calendar/BirthDateInput";
import Calendar, { CalendarTypesEnum } from "./components/calendar/Calendar";
import LivedTime from "./components/calendar/LivedTime";
import useUserDataStore from "./stores/userDataStore";

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
    <div className="flex flex-col justify-between min-h-screen layout">
      <div className="flex flex-col space-y-16">
        <LivedTime />
        <Calendar calendarType={CalendarTypesEnum.Personal} />
      </div>
      {/* <Quotes /> */}
    </div>
  );
};

export default Page;
