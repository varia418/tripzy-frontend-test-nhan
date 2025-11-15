import BookingForm from "@/components/BookingForm";
import { keysToCamel } from "@/lib/utils";
import busLocations from "@/mocks/bus-locations.json";

export interface Location {
  shortCode: string;
  englishName: string;
  codeState: string;
}

export interface LocationData {
  busLocations: Location[];
  hotelLocations: Location[];
  flightLocations: Location[];
}

async function fetchLocations(): Promise<LocationData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    busLocations: keysToCamel(busLocations),
    hotelLocations: [],
    flightLocations: [],
  };
}

export default async function Home() {
  const locationData = await fetchLocations();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="mt-16 mb-8 flex flex-col gap-2 text-center">
        <h1 className="text-4xl leading-none font-semibold tracking-wider">
          Travel Smarter, Not Harder
        </h1>
        <p className="text-muted-foreground text-lg leading-none font-normal tracking-normal">
          Make every trip effortless. Tripzy lets you book rides and plan
          journeys with ease
        </p>
      </div>
      <BookingForm locationData={locationData} />
    </div>
  );
}
