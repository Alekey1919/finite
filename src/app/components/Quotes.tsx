import { useTranslations } from "next-intl";
import React from "react";

const timeQuotes = [
  "timeIsFinite",
  "timeWaitsForNoOne",
  "youCantStopTime",
  "nowYoungerThanNow",
  "cantPauseLife",
  "eachSecondIsUnique",
];

const takeActionQuotes = [
  "talkToThatPerson",
  "goOnThatTrip",
  "startThatProject",
  "makeThatPhoneCall",
  "applyForThatJob",
  "pursueThatDream",
  "stepOutsideComfortZone",
  "turnIdeasIntoAction",
  "takeThatRisk",
  "embraceTheChallenge",
];

const Quotes = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col text-center space-y-2 pt-14 px-6">
      <span>
        {t(`${timeQuotes[Math.floor(Math.random() * timeQuotes.length)]}`)}{" "}
        {t("soDontWait")}
      </span>
      <span>
        {t(
          `${
            takeActionQuotes[
              Math.floor(Math.random() * takeActionQuotes.length)
            ]
          }`
        )}
      </span>
    </div>
  );
};

export default Quotes;
