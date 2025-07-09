import { Property } from "@/app/types";
import PropGallery from "@/components/PropGalary";
import { CiLocationOn } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";

type Props = {
    params: {
        id: string;
    };
};

async function fetchPropertyById(id: string): Promise<Property> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${ apiUrl }/properties/${ id }`, {
        next: { revalidate: 600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch property");
    }

    return await res.json();
}

export default async function PropertyPage({ params }: Props) {
    const property = await fetchPropertyById(params.id);

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Property Details</h1>
            <div>
                <PropGallery images={ property.images } />
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">{ property.title }</h1>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-semibold">
                        <FaHome />
                        <span>{ property.propertyType }</span>
                    </div>
                </div>

                <p className="text-2xl text-blue-600 font-bold mt-4">${ property.price }</p>

                <div className="mt-4 flex items-center text-gray-700 gap-2">
                    <CiLocationOn size={ 20 } />
                    <span className="font-medium">
                        { property.location.district }, { property.location.city }, { property.location.country }
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <IoBedOutline size={ 24 } />
                        <span className="font-semibold">{ property.bedrooms } Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LiaBathSolid size={ 24 } />
                        <span className="font-semibold">{ property.bathrooms } Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbRulerMeasure size={ 24 } />
                        <span className="font-semibold">{ property.area } m²</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{ property.description }</p>
                </div>

                <div className="mt-6">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Contact Agent
                    </button>
                    <div className="mt-10">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Location on Map</h2>
                        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                            <iframe
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                className="rounded-lg"
                                src={ `https://www.google.com/maps?q=${ encodeURIComponent(
                                    `${ property.location.district }, ${ property.location.city }, ${ property.location.country }`
                                ) }&output=embed` }
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
