import Image from "next/image";
import db from '@/lib/drizzle/drizzle';
import { hotel } from "@/lib/drizzle/schema";
import { InferSelectModel, SQL, and, eq } from "drizzle-orm";
import Search from "@/components/blocks/search";
import HotelCard from "@/components/blocks/hotelCard";


type HotelFilters = {
  location?: string,
  starRating?: number,
}
async function getTopHotels(filters: HotelFilters): Promise<InferSelectModel<typeof hotel>[]> {
  const where: SQL[] = []

  if (filters.location) {
    where.push(eq(hotel.location, filters.location))
  }
  if (filters.starRating) {
    where.push(eq(hotel.starRating, filters.starRating))
  }

  let q = db.select().from(hotel).where(and(...where)).limit(12);
  return q;
}

type PageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string | undefined };
}
export default async function Home({ searchParams }: PageProps) {
  const topHotels = await getTopHotels({
    location: searchParams?.location,
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="min-h-[40%] bg-black text-white dark flex flex-col py-4 justify-center items-center">
        <h1 className="text-4xl font-bold max-w-fit uppercase leading-loose">Bridge</h1>
        <Search />
      </div>
      <h4 className="text-4xl p-4 font-medium">Top Hotels  {searchParams?.location ? `in ${searchParams?.location}` : ''}</h4>
      <div className="flex flex-wrap gap-y-4 gap-x-4">
        {topHotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
      </div>
    </div >
  );
}


