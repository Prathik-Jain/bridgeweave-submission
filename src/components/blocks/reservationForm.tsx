'use client';

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "./dateRangePicker";
import { ComponentProps, FormHTMLAttributes, ReactHTMLElement, ReactPropTypes, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useToast } from "../ui/use-toast";
import { useFormState } from "react-dom";

export default function ReservationForm({ action, hotelId }: { action: (prevState: { success: boolean, message: string }, formData: FormData) => any, hotelId: number }) {
    const [dates, setDates] = useState<DateRange | undefined>()
    const { toast } = useToast();
    const [formState, formAction] = useFormState(action, null)


    useEffect(() => {
        if (!formState) { return }
        if (formState?.success) {
            toast({
                description: formState.message,
            })
        } else if (formState?.success === false) {
            toast({
                description: formState.message,
                variant: "destructive",
            })
        }
    }, [formState, toast])

    return (

        <form className="flex flex-col gap-2" action={(formData) => {
            formData.append('dates', JSON.stringify(dates))
            formData.append('hotelId', `${hotelId}`)
            formAction(formData)

        }}



        >
            <Card>
                <CardHeader>
                    <h3 className="text-3xl font-bold">Reseve Now</h3>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <label>Your Name</label>
                    <Input name="name" placeholder="Your Name"></Input>
                    <label>Check-In & Check-Out Dates</label>
                    <DatePickerWithRange onDateChange={setDates} />
                </CardContent>
                <CardFooter className="float-right">
                    <Button variant={"default"} size={"lg"} className="mt-4">Reseve <ArrowRightIcon className="ml-2" /></Button>
                </CardFooter>
            </Card>
        </form>
    )
}
