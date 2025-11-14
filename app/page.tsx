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
      <div>
        <button>Search</button>
      </div>
    </div>
  );
}
