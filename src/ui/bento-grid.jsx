import React from "react";
import { cn } from "../Components/utils/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 mt-8 mb-10 transition duration-200",
        className
      )}
      style={{ minHeight: 400 }}
    >
      {header}
      <div className="transition duration-200">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600">
          {description}
        </div>
      </div>
    </div>
  );
};