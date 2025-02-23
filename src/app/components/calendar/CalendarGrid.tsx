import React from "react";
import { twMerge } from "tailwind-merge";
import DeceasedTooltip from "./DeceasedTooltip";

const CalendarGrid = ({
  boxesAmount,
  livedBoxesAmount,
  columns,
  gap,
  boxSize,
  famousDeaths,
}: {
  boxesAmount: number;
  livedBoxesAmount: number | null;
  columns: number;
  gap: string;
  boxSize: string;
  famousDeaths?: { [key: number]: string[] };
}) => {
  const rows = boxesAmount / columns;

  return (
    <div className={twMerge("flex flex-col mx-auto relative", gap)} key={0}>
      {new Array(rows).fill(null).map((_, rowIndex) => {
        return (
          <div key={rowIndex} className={twMerge("flex", gap)}>
            {new Array(columns).fill(null).map((_, boxIndex) => {
              const generalBoxNumber = rowIndex * columns + boxIndex;

              const deceased = famousDeaths && famousDeaths[generalBoxNumber];

              return (
                <div
                  className={twMerge(
                    "w-2 h-2 border-solid border-accent border-[1px] box relative group",
                    generalBoxNumber < livedBoxesAmount && "bg-accent",
                    generalBoxNumber === livedBoxesAmount &&
                      "bg-primary animate-pulse",
                    deceased && "bg-accent",
                    boxSize
                  )}
                  key={boxIndex}
                >
                  {deceased && <DeceasedTooltip deceased={deceased} />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
