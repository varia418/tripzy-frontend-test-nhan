import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { CategoryTab } from "./BookingForm";
import React from "react";

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

interface CategoryTabsProps {
  tabs: CategoryTab[];
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}

function CategoryTabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: CategoryTabsProps) {
  return (
    <div className="flex w-full items-stretch justify-between rounded-2xl p-3 shadow-[0_4px_12px_0_hsla(207,57%,29%,0.12)]">
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
