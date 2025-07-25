import { Property } from '@/app/types';
import PropertiesClient from '@/components/PropertiesClient';
import Filters from '@/components/Filters';
import PriceFilters from '@/components/PriceFilters';
import Search from '@/components/Search';
import { Suspense } from 'react';

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
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-center">
                    Discover Your Dream Property
                </h1>
                <p className="text-gray-600 text-center mt-2">
                    Explore our curated collection of premium properties
                </p>
            </div>
            <div className='w-full max-w-6xl mx-auto mb-8'>
                <Suspense fallback={ <div className="text-center">Loading filters...</div> }>
                    <Filters />
                </Suspense>

                <Suspense fallback={ <div className="text-center">Loading filters...</div> }>
                    <PriceFilters />
                </Suspense>

                <Suspense fallback={ <div className="text-center">Loading filters...</div> }>
                    <Search />
                </Suspense>
            </div>

            {/* Add Suspense boundary around PropertiesClient */ }
            <Suspense fallback={ <div className="text-center">Loading properties...</div> }>
                <PropertiesClient properties={ allProperties } isAdmin={ true } />
            </Suspense>
        </main>
    );
}
