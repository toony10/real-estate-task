import PropCard from '@/components/PropCard';
import { Property } from '../types';
import { redirect } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"



async function getProperties(page: number = 1): Promise<{ data: Property[], total: number }> {
    const limit = 10;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const allRes = await fetch(`${ baseUrl }/properties`);
    const allData = await allRes.json();
    const total = allData.length;

    const pagedRes = await fetch(`${ baseUrl }/properties?page=${ page }&limit=${ limit }`, {
        next: { revalidate: 60 },
    });

    if (!pagedRes.ok) throw new Error('Failed to fetch properties');
    const data = await pagedRes.json();

    return { data, total };
}



type Props = {
    searchParams: { page?: string };
};

export default async function page({ searchParams }: Props) {
    const currentPage = parseInt(searchParams.page || '1');

    const { data: properties } = await getProperties(currentPage);
    const { total } = await getProperties(currentPage);
    const totalPages = Math.ceil(total / 10);


    if (!properties || properties.length === 0) {
        redirect('/properties?page=1');
    }
    if (currentPage < 1) {
        redirect('/properties?page=1');
    }

    return (
        <main className="min-h-screen bg-white p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Properties</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                { properties.map((property) => (
                    <PropCard { ...property } key={ property.id } />
                )) }
            </div>


            <div className='flex justify-center mt-8'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={ `?page=${ currentPage - 1 }` } />
                        </PaginationItem>
                        { Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={ i + 1 }>
                                <PaginationLink href={ `?page=${ i + 1 }` } isActive={ currentPage === i + 1 }>
                                    { i + 1 }
                                </PaginationLink>
                            </PaginationItem>
                        )) }
                        { properties.length < 10 && currentPage === 1 && (
                            <PaginationItem className="hidden sm:block">
                                <PaginationLink href="?page=2">2</PaginationLink>
                            </PaginationItem>
                        ) }
                        <PaginationItem>
                            <PaginationNext href={ `?page=${ currentPage + 1 }` } />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </main>
    );
}
