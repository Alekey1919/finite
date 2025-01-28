import { useEffect, useState } from "react";
import { DateTime, Interval } from "luxon";

interface LivedTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Custom hook to calculate how many years, months, days, minutes, and seconds
 * a person has lived based on their birth date. Updates in real time.
 *
 * @param {string} birthDate - The birth date timestamp in seconds
 * @returns {LivedTime} An object with `years`, `months`, `days`, `hours`, `minutes`, and `seconds` lived so far.
 */
const useLivedTime = (birthDate: number) => {
  const [livedTime, setLivedTime] = useState<LivedTime>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    console.log("birthDate", birthDate);
    const birthDateTime = DateTime.fromMillis(birthDate);

    const updateLivedTime = () => {
      const now = DateTime.now();
      const interval = Interval.fromDateTimes(birthDateTime, now);
      const duration = interval.toDuration([
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
      ]);

      setLivedTime({
        years: Math.floor(duration.years),
        months: Math.floor(duration.months),
        days: Math.floor(duration.days),
        hours: Math.floor(duration.hours),
        minutes: Math.floor(duration.minutes),
        seconds: Math.floor(duration.seconds),
      });
    };

    // Initial calculation
    updateLivedTime();

    // Update every second
    const timer = setInterval(updateLivedTime, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [birthDate]);

  return livedTime;
};

export default useLivedTime;
