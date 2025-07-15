import { Property } from "@/app/types";
import { SelectDemo } from "./Select";
import Search from "./Search";
import PriceFilters from "./PriceFilters";

async function getFilters() {
    const res = await fetch(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/properties`, {
        next: { revalidate: 60000 },
    });
    const properties: Property[] = await res.json();
    const countries = Array.from(new Set(properties.map(property => property.location.country)));
    const cities = Array.from(new Set(properties.map(property => property.location.city)));
    const districts = Array.from(new Set(properties.map(property => property.location.district)));
    const propertyTypes = Array.from(new Set(properties.map(property => property.propertyType)));
    return { countries, cities, districts, propertyTypes };
}

export default async function Filters() {
    const { countries, cities, districts, propertyTypes } = await getFilters();
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 place-items-center">
            <SelectDemo title="Country" items={ countries } />
            <SelectDemo title="City" items={ cities } />
            <SelectDemo title="District" items={ districts } />
            <SelectDemo title="Property Type" items={ propertyTypes } />
        </div>
    )
}
