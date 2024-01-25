'use client';

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";



async function getLocations({ like = "" }) {
    const res = await fetch('/api/location')
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    return res.json();
}

export default function Search() {

    const [location, setLocation] = useState('')
    let allLocaitons = useRef<string[]>([]);
    let [validLocations, setValidLocations] = useState<string[]>([]);
    let [showDropdown, setShowDropdown] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    let onLocationSelected = (location: string) => {
        let params = new URLSearchParams({
            location,
        })
        setLocation(location);
        setShowDropdown(false);
        router.push(`${pathname}?${params}`)
    }

    useMemo(() => {
        setValidLocations(allLocaitons.current.filter((x) => x.toLowerCase().startsWith(location.toLowerCase())))
    }, [location])


    useEffect(() => {
        getLocations({}).then((locs) => {
            allLocaitons.current = locs
            setValidLocations(locs);
        })
    }, [])




    return <div className="relative">
        <Input className="w-80" type="text"
            placeholder="Where do you want to go?"
            value={location}
            onFocus={() => { setLocation(location); setShowDropdown(true) }}
            onChange={(e) => { setLocation(e.target.value); }}
        />
        {showDropdown &&
            <div className="absolute top-10 left-0">
                <ScrollArea className="max-h-48 w-80 rounded-md border overflow-scroll bg-black">
                    <div className="p-4">
                        {!!validLocations.length && validLocations.map((location, idx) => (
                            <Button key={`location-${idx}`} variant="ghost" className="block w-full" onClick={() => { onLocationSelected(location) }}>
                                <div className="text-sm text-left">
                                    {location}
                                </div>
                                <Separator className="my-2 bg-neutral-600 h-[1px]" />
                            </Button>
                        ))}
                        {!!!validLocations.length && <p> No results</p>}
                    </div>
                </ScrollArea>

            </div >
        }
    </div>
}


