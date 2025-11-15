"use client";

import { useMemo, useState } from "react";
import CategoryTabs from "./CategoryTabs";
import { Button } from "./ui/button";
import Image from "next/image";
import { LocationData } from "@/app/page";
import { ArrowRightLeft, Search, UserRound } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import BusIcon from "./icons/BusIcon";
import { DatePicker } from "./ui/DatePicker";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

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

const formSchema = z
  .object({
    from: z.string().min(1, "Please enter a departure location"),
    to: z.string().min(1, "Please enter a destination location"),
    departureDate: z
      .date("Please enter a valid date")
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        "You cannot select a date in the past"
      ),
    returnDate: z.date("Please enter a valid date").optional(),
    roundTripEnabled: z.boolean(),
    passengers: z
      .number("Please enter a number")
      .min(1, "At least one passenger is required"),
  })
  .refine((data) => !data.roundTripEnabled || data.returnDate, {
    message: "Please enter a valid date",
    path: ["returnDate"],
  })
  .refine(
    (data) =>
      !data.roundTripEnabled ||
      data.returnDate! >= new Date(new Date().setHours(0, 0, 0, 0)),
    {
      message: "You cannot select a date in the past",
      path: ["returnDate"],
    }
  )
  .refine(
    (data) => !data.roundTripEnabled || data.returnDate! >= data.departureDate,
    {
      message: "Return date cannot be earlier than the departure date",
      path: ["returnDate"],
    }
  );

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      departureDate: undefined,
      returnDate: undefined,
      roundTripEnabled: false,
      passengers: 1,
    },
  });

  const { handleSubmit, control, setValue, trigger } = form;

  const { roundTripEnabled } = useWatch({ control });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-[1170px] flex-col items-center gap-6 rounded-2xl bg-white pb-6 shadow-[0_8px_32px_0_hsla(207,57%,29%,0.12)]">
      <CategoryTabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {locations.length > 0 ? (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="flex w-full gap-4 p-4">
              <div className="grid grid-flow-col grid-cols-[minmax(0,224px)_1fr_minmax(0,224px)] grid-rows-[repeat(3,minmax(0,max-content))] gap-2">
                <FormField
                  control={control}
                  name="from"
                  render={({ field }) => (
                    <>
                      <FormLabel>FROM</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter city, terminal,..."
                          icon={<BusIcon size={16} />}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
                <Button
                  variant={"ghost"}
                  type="button"
                  className="text-primary hover:text-primary row-start-2 size-12 self-end rounded-full p-3 shadow-[0_2px_4px_0_hsla(207,57%,29%,0.12)]"
                >
                  <ArrowRightLeft />
                </Button>
                <FormField
                  control={control}
                  name="to"
                  render={({ field }) => (
                    <>
                      <FormLabel className="row-start-1">TO</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter city, terminal,..."
                          icon={<BusIcon size={16} />}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
              <div className="grid grid-flow-col grid-cols-[repeat(2,minmax(0,224px))] grid-rows-[repeat(3,minmax(0,max-content))] gap-2">
                <FormField
                  control={control}
                  name="departureDate"
                  render={({ field }) => (
                    <>
                      <FormLabel className="row-start-1">
                        DEPARTURE DATE
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          {...field}
                          onChange={(value) => {
                            field.onChange(value);
                            trigger("returnDate");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
                <FormField
                  control={control}
                  name="returnDate"
                  render={({ field }) => (
                    <>
                      <div className="row-start-1 flex gap-2">
                        <Checkbox
                          checked={roundTripEnabled}
                          onCheckedChange={(checked: boolean) => {
                            setValue("roundTripEnabled", checked);
                            trigger("returnDate");
                          }}
                        />
                        <Label className="text-muted-foreground text-xs leading-4 font-medium tracking-normal">
                          ROUND TRIP?
                        </Label>
                      </div>
                      <FormControl>
                        <DatePicker
                          {...field}
                          disabled={!roundTripEnabled}
                          onChange={(value) => {
                            field.onChange(value);
                            trigger("returnDate");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
              <div className="grid grid-flow-col grid-rows-[repeat(3,minmax(0,max-content))] gap-2">
                <FormField
                  control={control}
                  name="passengers"
                  render={({ field }) => (
                    <>
                      <FormLabel>NO. OF PASSENGER</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[149px]"
                          type="number"
                          icon={<UserRound size={16} />}
                          min={1}
                          onChange={(e) => {
                            if (e.target.valueAsNumber > 0) {
                              field.onChange(e.target.valueAsNumber);
                            } else {
                              field.onChange(1);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
            </div>
            <Button
              className="flex w-[266px] gap-2 rounded-full px-5 py-4"
              type="submit"
            >
              <Search />
              <span className="text-sm leading-5 font-semibold tracking-[10%]">
                SEARCH
              </span>
            </Button>
          </form>
        </Form>
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
