'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PropCard from '@/components/PropCard';
import { Property } from '@/app/types';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PropertiesClientProps {
    properties: Property[];
    isAdmin?: boolean | undefined;
}

export default function PropertiesClient({ properties, isAdmin }: PropertiesClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const itemsPerPage = 10;

    const filteredProperties = useMemo(() => {
        const country = searchParams.get('country');
        const city = searchParams.get('city');
        const district = searchParams.get('district');
        const propertyType = searchParams.get('property type');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const searchQuery = searchParams.get('search');

        let filtered = properties;

        if (country) {
            filtered = filtered.filter(property =>
                property.location.country?.toLowerCase() === country.toLowerCase()
            );
        }

        if (district) {
            filtered = filtered.filter(property =>
                property.location.district?.toLowerCase() === district.toLowerCase()
            );
        }

        if (city) {
            filtered = filtered.filter(property =>
                property.location.city?.toLowerCase() === city.toLowerCase()
            );
        }

        if (propertyType) {
            filtered = filtered.filter(property =>
                property.propertyType?.toLowerCase() === propertyType.toLowerCase()
            );
        }
        if (minPrice) {
            filtered = filtered.filter(property =>
                property.price >= parseFloat(minPrice)
            );
        }

        if (maxPrice) {
            filtered = filtered.filter(property =>
                property.price <= parseFloat(maxPrice)
            );
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(query) ||
                property.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [properties, searchParams]);

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProperties.slice(startIndex, endIndex);
    }, [filteredProperties, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${ params.toString() }`, { scroll: false });
    };

    if (paginatedProperties.length === 0) {
        return <p className="text-center text-gray-500">No properties found.</p>;
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                { paginatedProperties.map((property) => (
                    <PropCard
                        property={ property }
                        isAdmin={ isAdmin }
                        key={ property.id }
                    />
                )) }
            </div>

            { totalPages > 1 && (
                <div className='flex justify-center mt-8'>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={ `?page=${ Math.max(1, currentPage - 1) }` }
                                    onClick={ () => handlePageChange(Math.max(1, currentPage - 1)) }
                                    className={ currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer' }
                                />
                            </PaginationItem>

                            { Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={ i + 1 }>
                                    <PaginationLink
                                        href={ `?page=${ i + 1 }` }
                                        onClick={ () => handlePageChange(i + 1) }
                                        isActive={ currentPage === i + 1 }
                                        className="cursor-pointer"
                                    >
                                        { i + 1 }
                                    </PaginationLink>
                                </PaginationItem>
                            )) }

                            <PaginationItem>
                                <PaginationNext
                                    href={ `?page=${ Math.min(totalPages, currentPage + 1) }` }
                                    onClick={ () => handlePageChange(Math.min(totalPages, currentPage + 1)) }
                                    className={ currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer' }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            ) }
        </>
    );
}
