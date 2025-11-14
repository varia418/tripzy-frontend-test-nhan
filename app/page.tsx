import CategoryTabs from "@/components/CategoryTabs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl leading-none font-semibold tracking-wider">
          Travel Smarter, Not Harder
        </h1>
        <p className="text-muted-foreground text-lg leading-none font-normal tracking-normal">
          Make every trip effortless. Tripzy lets you book rides and plan
          journeys with ease
        </p>
      </div>
      <div className="w-[1170px] flex flex-col gap-6 rounded-2xl bg-white pb-6">
        <CategoryTabs />
        <Button>Search</Button>
      </div>
    </div>
  );
}
