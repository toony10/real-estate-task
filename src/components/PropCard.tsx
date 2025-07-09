import { Property } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";

export default function PropCard(property: Property) {
    return (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="h-48 w-full relative">
                <Image
                    src={ property.images[0] }
                    alt={ property.title }
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-3 flex-grow">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-900 line-clamp-1">{ property.title }</h1>
                    <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        <FaHome size={ 14 } className="text-gray-500" />
                        <span className="text-gray-600 font-medium">{ property.propertyType }</span>
                    </div>
                </div>

                <span className="text-base font-semibold text-blue-700">${ property.price }</span>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <CiLocationOn size={ 16 } />
                    <span>{ property.location.district }, { property.location.city }, { property.location.country }</span>
                </div>

                <div className="flex justify-between text-gray-700 text-sm">
                    <div className="flex items-center gap-1">
                        <IoBedOutline size={ 18 } />
                        <span>{ property.bedrooms } m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LiaBathSolid size={ 18 } />
                        <span>{ property.bathrooms } m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <TbRulerMeasure size={ 18 } />
                        <span>{ property.area } m²</span>
                    </div>
                </div>
                <Link href={ `/properties/${ property.id }` } className="mt-auto">
                    <button className="mt-3 w-full bg-blue-600 text-white text-sm cursor-pointer font-semibold py-2 rounded-md hover:bg-blue-700 transition">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}