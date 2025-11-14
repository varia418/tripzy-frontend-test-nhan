"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "./ui/separator";

interface CategoryTab {
  label: string;
  value: string;
  icon: React.ReactNode;
  selectedClassName: string;
}

const tabs: CategoryTab[] = [
  {
    label: "Bus & Shuttle",
    value: "bus",
    icon: (
      <span className="flex size-12 flex-none items-center justify-center rounded-full bg-sky-100">
        <Image src="/bus.svg" alt="bus" width={24} height={24} />
      </span>
    ),
    selectedClassName: "bg-sky-50",
  },
  {
    label: "Hotel & Accommodation",
    value: "hotel",
    icon: (
      <span className="flex size-12 flex-none items-center justify-center rounded-full bg-lime-100">
        <Image src="/hotel.svg" alt="hotel" width={24} height={24} />
      </span>
    ),
    selectedClassName: "bg-lime-50",
  },
  {
    label: "Flight",
    value: "flight",
    icon: (
      <span className="flex size-12 flex-none items-center justify-center rounded-full bg-blue-100">
        <Image src="/flight.svg" alt="flight" width={24} height={24} />
      </span>
    ),
    selectedClassName: "bg-blue-50",
  },
];

function TabButton({
  icon,
  label,
  onClick,
  selected,
  selectedClassName,
}: CategoryTab & {
  selected: boolean;
  selectedClassName: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "flex flex-1 shrink-0 items-center gap-3 rounded-lg px-4 py-3",
        !selected && "hover:bg-gray-100",
        selected && selectedClassName
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-lg leading-none font-medium tracking-normal">
        {label}
      </span>
    </button>
  );
}

function CategoryTabs() {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value);

  return (
    <div className="flex w-full items-stretch justify-between p-3">
      {tabs.map((tab, index) => {
        const selected = selectedTab === tab.value;
        const shouldShowSeparator =
          index > 0 && tabs[index - 1].value !== selectedTab && !selected;
        return (
          <React.Fragment key={tab.value}>
            <Separator
              orientation="vertical"
              className={cn(
                "h-10 min-h-10 self-center",
                !shouldShowSeparator && "opacity-0"
              )}
            />
            <TabButton
              selected={selected}
              onClick={() => setSelectedTab(tab.value)}
              {...tab}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
