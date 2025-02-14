"use client";

import { useEffect, useState } from "react";
import useUserDataStore from "./stores/userDataStore";
import BirthDateInput from "./components/calendar/BirthDateInput";
import LivedTime from "./components/calendar/LivedTime";
import Calendar from "./components/calendar/Calendar";

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
    <div className="flex flex-col space-y-16 py-10 lg:py-20">
      <LivedTime birthDate={birthDate} />
      <Calendar birthDate={birthDate} />
    </div>
  );
};

export default Page;
