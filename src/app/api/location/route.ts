import db from "@/lib/drizzle/drizzle";
import { hotel } from "@/lib/drizzle/schema";

async function getLocations(): Promise<string[]> {
    const locations: string[] = [];
    (await db.selectDistinct({ location: hotel.location })
        .from(hotel)
        .execute())
        .forEach((x) => locations.push(x.location!))
    return locations;
}

export async function GET() {
    return Response.json(await getLocations())
}