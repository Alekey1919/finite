import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const DeceasedTooltip = ({ deceased }) => {
  const [offsetX, setOffsetX] = useState("");
  const [offsetY, setOffsetY] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const toolTipRef = useRef<HTMLDivElement>(null);

  const calculateOffset = useCallback(() => {
    if (!toolTipRef.current) return;

    const { width: tooltipWidth, height: tooltipHeight } =
      toolTipRef.current.getBoundingClientRect();
    const {
      x: containerX,
      width: containerWidth,
      y: containerY,
    } = toolTipRef.current.parentElement.getBoundingClientRect();

    const position = {
      x: containerX + containerWidth / 2,
      y: containerY,
    };

    setPosition(position);

    const leftEdgePosition = position.x - tooltipWidth / 2;
    const rightEdgePosition = position.x + tooltipWidth / 2;

    if (leftEdgePosition < 0) {
      setOffsetX(`calc(-50% + ${Math.abs(position.x - tooltipWidth / 2)}px)`);
    } else if (rightEdgePosition > window.innerWidth) {
      setOffsetX(`calc(-50% - ${rightEdgePosition - window.innerWidth}px)`);
    } else {
      setOffsetX(`translate(-50%, )`);
    }

    setOffsetY(`-${tooltipHeight + 10}px`);
  }, []);

  // Calculate the tooltip position when the parent is hovered to make sure the position is correct
  // If this is initialized at first it doesn't take into account the page scroll
  useEffect(() => {
    toolTipRef.current.parentElement.addEventListener("mouseover", () => {
      calculateOffset();
    });
  }, [calculateOffset]);

  return (
    <div
      className={twMerge(
        "bg-accent text-background px-2 py-1 text-base fixed mx-auto whitespace-nowrap -translate-x-1/2 -translate-y-[120%]",
        "opacity-0 transition-opacity group-hover:opacity-100 flex flex-col text-center rounded-lg tooltip-arrow pointer-events-none"
      )}
      style={{
        transform: `translate(${offsetX}, ${offsetY})`,
        top: position.y,
        left: position.x,
      }}
      ref={toolTipRef}
    >
      {deceased.map((name, index) => {
        return <span key={index}>{name}</span>;
      })}
    </div>
  );
};

export default DeceasedTooltip;
