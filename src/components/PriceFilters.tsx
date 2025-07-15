'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from './ui/input'
import { Suspense } from 'react';

export default function PriceFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handlePriceChange = (type: 'minPrice' | 'maxPrice', value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(type, value);
        } else {
            params.delete(type);
        }

        // Update the URL with new parameters
        router.push(`?${ params.toString() }`, { scroll: false });
    };

    return (
        <div className="flex justify-center items-center gap-4 mb-6">
            <Suspense>

                <Input
                    id="minPrice"
                    type="number"
                    placeholder="Min price..."
                    className="w-[200px]"
                    defaultValue={ searchParams.get('minPrice') || '' }
                    onChange={ (e) => handlePriceChange('minPrice', e.target.value) }
                />
            </Suspense>

            <Suspense>
                <Input
                    id="maxPrice"
                    type="number"
                    placeholder="Max price..."
                    className="w-[200px]"
                    defaultValue={ searchParams.get('maxPrice') || '' }
                    onChange={ (e) => handlePriceChange('maxPrice', e.target.value) }
                />
            </Suspense>

        </div>
    )
}
