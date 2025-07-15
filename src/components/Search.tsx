'use client'
import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";



export default function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (query) {
            params.set('search', query);
        } else {
            params.delete('search');
        }

        // Update the URL with new parameters
        router.push(`/properties?${ params.toString() }`, { scroll: false });
    };
    return (
        <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder='Search properties...'
                className="pl-9"
                onChange={ (e) => {
                    handleSearch(e.target.value);
                } }
            />
        </div>
    )
}