import db from "@/lib/drizzle/drizzle";
import { reservation, hotel } from "@/lib/drizzle/schema";
import { formatDate, differenceInDays } from "date-fns";
import { count, and, or, lt, sql, gt, gte, lte, eq, InferInsertModel } from "drizzle-orm";

export async function bookHotelAction(_: any, data: FormData) {
    'use server';
    const name = data.get('name') as string
    const hotelId = parseInt(data.get('hotelId') as string)
    const dates = JSON.parse(data.get('dates') as string)
    const fromDate = new Date(dates.from);
    const toDate = new Date(dates.to);
    const fromDateStr = formatDate(fromDate, 'yyyy-MM-dd')
    const toDateStr = formatDate(toDate, 'yyyy-MM-dd')

    const query = db
        .select({ value: count() })
        .from(reservation)
        .where(
            and(
                or(
                    and(lt(sql`${toDateStr}`, reservation.checkIn), gt(sql`${fromDateStr}`, reservation.checkOut)),
                    and(gte(sql`${toDateStr}`, reservation.checkIn), lte(sql`${fromDateStr}`, reservation.checkOut)),
                ),
                eq(reservation.hotelId, hotelId)
            )
        )


    const numberOfReservations = await query.execute()

    // If hotel is reserved for the date
    if (numberOfReservations[0].value != 0) {
        return { success: false, message: 'Hotel already booked for the selected dates' }
    }

    // else book
    const rate = await db.select({ rate: hotel.rate }).from(hotel).where(eq(hotel.id, hotelId))
    let res: InferInsertModel<typeof reservation> = {
        id: Math.floor(Math.random() * 10000) + hotelId,
        checkIn: fromDate,
        checkOut: toDate,
        guestName: name,
        hotelId: hotelId,
        totalAmount: `${differenceInDays(toDate, fromDate) * parseInt(rate[0].rate)}`,
    };
    await db.insert(reservation).values(res)

    return { success: true, message: 'Reservation Booked' }
}