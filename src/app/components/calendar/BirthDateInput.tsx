"use client";

import useUserDataStore from "@/app/stores/userDataStore";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const maxYear = new Date().getFullYear();

const years = Array.from({ length: 100 }, (_, i) => maxYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const Input = ({
  value,
  setter,
  text,
  options,
}: {
  value: number;
  setter: (v: number) => void;
  text: string;
  options: number[];
}) => {
  return (
    <div className="flex flex-col bg-transparent text-accent w-20 text-center space-y-2 text-base lg:text-lg 2xl:text-2xl">
      <span className="text-center">{text}</span>
      <select
        name={text}
        id={text}
        value={value}
        onChange={(e) => setter(parseInt(e.target.value))}
        className="appearance-none text-center bg-transparent border-b-[1px] border-solid border-accent cursor-pointer"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-background text-accent"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const BirthDateInput = () => {
  const [day, setDay] = useState(23);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(1998);

  const { setBirthDate } = useUserDataStore();
  const t = useTranslations();

  const handleSave = (day: number, month: number, year: number) => {
    const birthDate = new Date(year, month - 1, day);

    setBirthDate(birthDate.getTime());
  };

  return (
    <div className="flex flex-col items-center space-y-8 lg:space-y-10 h-full min-h-screen justify-center">
      <h1 className="title">{t("enterBirthDate")}</h1>
      <div className="flex space-x-4">
        <Input setter={setDay} value={day} text={t("day")} options={days} />
        <Input
          setter={setMonth}
          value={month}
          text={t("month")}
          options={months}
        />
        <Input setter={setYear} value={year} text={t("year")} options={years} />
      </div>
      <button
        className={twMerge(
          "before:ease relative h-12 overflow-hidden border bg-accent text-white shadow-2xl text-base 2xl:text-xl",
          "transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6",
          "before:bg-background before:opacity-10 before:duration-700 hover:before:-translate-x-40 font-semibold text-background w-fit py-2 px-10 rounded-md"
        )}
        onClick={() => handleSave(day, month, year)}
      >
        <span className="relative z-10">{t("save")}</span>
      </button>
    </div>
  );
};

export default BirthDateInput;
