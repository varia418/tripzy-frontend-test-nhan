export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return (
    <div className="bg-background mx-auto flex h-[872px] w-[1124px] flex-col gap-4 rounded-2xl p-8 font-semibold">
      <p>From: {params?.from}</p>
      <p>To: {params?.to}</p>
      <p>Departure date: {params?.departureDate}</p>
      <p>Return date: {params?.returnDate}</p>
      <p>No. of passengers: {params?.passengers}</p>
    </div>
  );
}
