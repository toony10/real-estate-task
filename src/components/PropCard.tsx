import { Property } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
import { HiOutlineHeart } from "react-icons/hi";

interface PropCardProps {
    property: Property;
    isAdmin?: boolean;
}

export default function PropCard({ property, isAdmin }: PropCardProps) {
    return (
        <div className="group w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1">
            {/* Image Section */ }
            <div className="h-56 w-full relative overflow-hidden">
                <Image
                    src={ property.images[0] }
                    alt={ property.title }
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient overlay */ }
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Property Type Badge */ }
                <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 text-xs bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <FaHome size={ 12 } className="text-blue-600" />
                        <span className="text-gray-800 font-medium">{ property.propertyType }</span>
                    </div>
                </div>

                {/* Admin Edit Button */ }
                { isAdmin ? (
                    <Link
                        href={ `/admin/properties/${ property.id }/edit` }
                        className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Edit
                    </Link>
                )
                    :
                    <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                        <HiOutlineHeart size={ 16 } className="text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                }
            </div>

            {/* Content Section */ }
            <div className="p-5 flex flex-col gap-4 flex-grow">
                {/* Title and Price */ }
                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                        { property.title }
                    </h1>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">
                            ${ property.price }
                        </span>
                    </div>
                </div>

                {/* Location */ }
                <div className="flex items-center gap-2 text-gray-600">
                    <CiLocationOn size={ 18 } className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">
                        { property.location.district }, { property.location.city }, { property.location.country }
                    </span>
                </div>

                {/* Property Details */ }
                <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <IoBedOutline size={ 18 } className="text-gray-400" />
                        <span className="text-sm font-medium">{ property.bedrooms }</span>
                        <span className="text-xs text-gray-500">beds</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <LiaBathSolid size={ 18 } className="text-gray-400" />
                        <span className="text-sm font-medium">{ property.bathrooms }</span>
                        <span className="text-xs text-gray-500">baths</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <TbRulerMeasure size={ 18 } className="text-gray-400" />
                        <span className="text-sm font-medium">{ property.area }</span>
                        <span className="text-xs text-gray-500">m²</span>
                    </div>
                </div>

                {/* View Details Button */ }
                <Link href={ `/properties/${ property.id }` } className="mt-auto">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}
