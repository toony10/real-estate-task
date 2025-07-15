import { Property } from '@/app/types';
import PropertiesClient from '@/components/PropertiesClient';
import Filters from '@/components/Filters';
import PriceFilters from '@/components/PriceFilters';
import Search from '@/components/Search';

async function getAllProperties(): Promise<Property[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${ baseUrl }/properties`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch properties');
    return await res.json();
}

export default async function Page() {
    const allProperties = await getAllProperties();

    return (
        <main className="min-h-screen bg-white p-6">
            <div className="mb-8 border-b border-gray-200 pb-4">
                <h1 className="text-4xl font-semibold text-gray-900 flex items-center justify-center">
                    <span className="mr-2">🏠</span>
                    Property Management Dashboard
                </h1>
                <p className="text-center text-gray-600 mt-2">Manage and monitor your real estate listings</p>
            </div>
            <Filters />
            <PriceFilters />
            <Search />
            <PropertiesClient properties={ allProperties } isAdmin />
        </main>
    );
}
