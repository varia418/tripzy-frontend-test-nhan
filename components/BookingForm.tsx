"use client";

import { useMemo, useState } from "react";
import CategoryTabs from "./CategoryTabs";
import { Button } from "./ui/button";
import Image from "next/image";
import { LocationData } from "@/app/page";

export interface CategoryTab {
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

function BookingForm({ locationData }: { locationData: LocationData }) {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value);

  const locations = useMemo(() => {
    switch (selectedTab) {
      case "bus":
        return locationData.busLocations;
      case "hotel":
        return locationData.hotelLocations;
      case "flight":
        return locationData.flightLocations;
      default:
        return [];
    }
  }, [selectedTab, locationData]);

  return (
    <div className="flex w-[1170px] flex-col items-center gap-6 rounded-2xl bg-white pb-6 shadow-[0_8px_32px_0_hsla(207,57%,29%,0.12)]">
      <CategoryTabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {locations.length > 0 ? (
        <div>
          <Button>Search</Button>
        </div>
      ) : (
        <div className="flex h-28 w-full items-center justify-center">
          <span className="text-muted-foreground text-lg leading-none font-normal tracking-normal">
            No data
          </span>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
