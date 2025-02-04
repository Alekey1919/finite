"use client";

import LivedTime from "./LivedTime";
import BirthDateInput from "./BirthDateInput";
import useUserDataStore from "../stores/userDataStore";
import Calendar from "../components/Calendar";

const Page = () => {
  const { birthDate } = useUserDataStore();

  if (!birthDate) {
    return <BirthDateInput />;
  }

  return (
    <div className="flex flex-col space-y-8">
      <LivedTime birthDate={birthDate} />
      <Calendar birthDate={birthDate} />
    </div>
  );
};

export default Page;
