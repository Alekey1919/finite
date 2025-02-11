"use client";

import LivedTime from "./LivedTime";
import BirthDateInput from "./BirthDateInput";
import useUserDataStore from "../stores/userDataStore";
import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col space-y-8 pb-10 lg:pb-20">
      <LivedTime birthDate={birthDate} />
      <Calendar birthDate={birthDate} />
    </div>
  );
};

export default Page;
