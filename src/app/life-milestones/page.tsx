"use client";

import { useEffect, useState } from "react";
import Calendar, { CalendarTypesEnum } from "../components/calendar/Calendar";
import useRegionStore from "../stores/regionStore";
import Tooltip from "../components/calendar/Tooltip";
import ModalCard from "../components/ModalCard";
import InfoIcon from "../components/Icons/InfoIcon";
import { getCookie, setCookie } from "../utils/cookies";
import { useTranslations } from "next-intl";

const disclaimerCookieKey = "life-milestones-disclaimer-seen";

const LifeMilestones = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const { region, setRegion } = useRegionStore();

  const t = useTranslations();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.navigator.language === "es-AR"
    ) {
      setRegion("ar");
    } else {
      setRegion("us");
    }
  }, [setRegion]);

  useEffect(() => {
    const modalSeen = getCookie(disclaimerCookieKey);

    if (!modalSeen) {
      setTimeout(() => {
        setShowDisclaimer(true);
        setCookie(disclaimerCookieKey, "true");
      }, 500);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center space-y-10">
        <h1 className="title text-center">Life milestones</h1>
        <Calendar calendarType={CalendarTypesEnum.LifeMilestones} />

        <div className="relative flex mx-auto group">
          <span
            className="uppercase cursor-pointer text-accent hover:text-primary transition-colors duration-300"
            onClick={() => setRegion(region === "us" ? "ar" : "us")}
          >
            {region}
          </span>
          <Tooltip text={"Change region"} />
        </div>
      </div>

      <InfoIcon
        className="absolute top-4 right-4"
        onClick={() => setShowDisclaimer(true)}
      />

      <ModalCard
        handleClose={() => setShowDisclaimer(false)}
        showModal={showDisclaimer}
      >
        <div className="flex flex-col space-y-4">
          <span>{t("lifeMilestones.disclaimer1")}</span>
          <span>{t("lifeMilestones.disclaimer2")}</span>
          <span>{t("lifeMilestones.disclaimer3")}</span>
        </div>
      </ModalCard>
    </>
  );
};

export default LifeMilestones;
