'use client';

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { hotel as hotelSchema } from "@/lib/drizzle/schema";
import Image from 'next/image'

export default function HotelCard({ hotel }: { hotel: InferSelectModel<typeof hotelSchema> }) {
    return (
        <Card className="w-full sm:w-[330px] rounded-md">
            <AspectRatio ratio={16 / 9} className="overflow-hidden">
                <Image src={hotel.featuredImage!} width={640} height={350} className="object-contain" alt={`Image of ${hotel.name} in ${hotel.location}`} />
            </AspectRatio>
            <CardHeader >
                <CardTitle>{hotel.name}</CardTitle>
                <div className="flex justify-between">
                    <div>
                        {hotel.location}
                    </div>
                    <div>
                        <p className="font-bold inline-block">${Math.floor(parseInt(hotel.rate ?? "0"))}</p>/night
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="py-2">
                <Link className={`${buttonVariants({ variant: "default", size: "lg" })} w-full`} href={`/hotel/${hotel.name?.toLowerCase().split(' ').join('-')}/${hotel.id}`} >
                    Reseve Now
                </Link>
            </CardFooter>
        </Card>
    )
}
