"use client";

import useUserDataStore from "@/app/stores/userDataStore";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
    <div className="flex flex-col bg-accent w-20 text-center">
      <select
        name={text}
        id={text}
        value={value}
        onChange={(e) => setter(parseInt(e.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <span className="text-center">{text}</span>
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
    <div className="flex flex-col items-center space-y-10">
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
        className="bg-accent font-semibold text-background w-fit py-2 px-10 rounded-md"
        onClick={() => handleSave(day, month, year)}
      >
        {t("save")}
      </button>
    </div>
  );
};

export default BirthDateInput;
