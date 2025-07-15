'use client'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface SelectDemoProps {
    title: string
    items: string[]
}

export function SelectDemo({ title, items }: SelectDemoProps) {
    const router = useRouter();

    const handleChange = (value: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (value === 'all') {
            searchParams.delete(title.toLowerCase());
        } else {
            searchParams.set(title.toLowerCase(), value);
        }
        router.push(`/properties?${ searchParams }`);
    };

    return (
        <Select onValueChange={ handleChange }>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={ `Select ${ title }` } />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{ title }</SelectLabel>
                    { ['All', ...items].map((item, index) => (
                        <SelectItem
                            key={ index }
                            value={ item.toLowerCase() }
                        >
                            { item }
                        </SelectItem>

                    )) }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
