import { bigint, bigserial, date, decimal, index, integer, pgTable, text } from "drizzle-orm/pg-core";

export const hotel = pgTable("hotel", {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    featuredImage: text("featured_image").notNull(),
    location: text("location").notNull(),
    rate: decimal("rate").notNull(),
    starRating: integer("star_rating").notNull(),
}, (hotel) => ({
    hotelsNameIdx: index("hotel_name_idx").on(hotel.name),
    startRatingIdx: index("hotel_star_rating_idx").on(hotel.starRating),
    locationIdx: index("hotel_location_idx").on(hotel.location),
    rateIdx: index("hotel_rate_idx").on(hotel.rate),
}))

export const reservation = pgTable("reservation", {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    hotelId: bigint("hotel_id", { mode: "number" }).notNull(),
    guestName: text("guest_name").notNull(),
    totalAmount: decimal("total_amount").notNull(),
    checkIn: date("check_in", { mode: 'date' }).notNull(),
    checkOut: date("check_out", { mode: 'date' }).notNull(),
}, (reservation) => ({
    hotelIdIdx: index("reservation_hotel_id_idx").on(reservation.hotelId),
    checkInIdx: index("reservation_hotel_check_in").on(reservation.checkIn),
    checkOutIdx: index("reservation_hotel_check_out").on(reservation.checkOut),
}))