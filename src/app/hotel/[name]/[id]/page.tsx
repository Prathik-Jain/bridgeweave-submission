import BackButton from "@/components/blocks/backButton";
import ReservationForm from "@/components/blocks/reservationForm";
import db from "@/lib/drizzle/drizzle"
import { hotel } from "@/lib/drizzle/schema"
import Image from "next/image";
import { redirect } from "next/navigation";
import { bookHotelAction } from "./bookHotelAction";
import { InferSelectModel, eq } from "drizzle-orm";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

async function getHotelDetails(id: number): Promise<InferSelectModel<typeof hotel>> {
    const hotelData = await db.select().from(hotel).where(eq(hotel.id, id)).execute()
    if (hotelData.length !== 1) {
        redirect('/');
    }
    return hotelData[0];
}



export default async function HotelDetailsView({ params }: { params: { id: string } }) {


    const hotelId = parseInt(params.id);
    if (!hotelId) {
        redirect('/')
    }
    const hotelData = await getHotelDetails(hotelId);


    return (
        <>
            <BackButton>
                <ArrowLeftIcon className="mr-2"></ArrowLeftIcon> Back
            </BackButton>

            <div className="flex flex-col md:flex-row m-2 md:m-12 gap-12 justify-start items-start ">
                {/* left col */}
                <Image className="min-w-[30%] max-h-[30%] rounded-md" src={hotelData.featuredImage!} loading="eager" width={300} height={300} alt="ss" />
                {/* right col */}
                <div className="max-w-[600px] max-h-[100%] overflow-scroll flex flex-col gap-2">
                    <h1 className="text-4xl pb-12 pt-4">{hotelData.name}</h1>
                    <p className="text-neutral-700 line-clamp-4">{hotelData.description}</p>
                    <div>
                        <p className="font-bold inline">{hotelData.rate}</p>
                        <p className="mt-4 text-2xl inline">
                            /night
                        </p>
                    </div>
                    <ReservationForm action={bookHotelAction} hotelId={hotelData.id} />
                </div>
            </div>
            <div>

            </div>
        </>
    )
}
