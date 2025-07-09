'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Property } from '@/app/types';

type ProductGalleryProps = {
    images: Property['images'];
};

export default function ProductGalary({ images }: ProductGalleryProps) {
    const [current, setCurrent] = useState(0);

    return (
        <div className='w-full'>
            {/* MAIN */ }
            <div className='h-[500px] md:h-[1000px] relative transition-all'>
                { images && images && (
                    <Image alt='' src={ images[current] } fill sizes='100vw' className='object-cover rounded-md' />
                ) }
            </div>
            {/* ALL IMAGES */ }
            <div className='flex gap-2 items-center justify-center'>
                { images && images.map((image) => (
                    <div key={ image } className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer' onClick={ () => setCurrent(images.indexOf(image)) }>
                        <Image alt='' src={ image } fill sizes='100vw' className={ `object-cover rounded-md transition-all duration-300 ${ images.indexOf(image) === current && 'border-[3px] border-red-400 p-2' }` } />
                    </div>
                )) }
            </div>
        </div>
    )
}
