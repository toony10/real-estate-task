import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>
            <div className="flex flex-col items-center gap-4">
                <Link
                    href="/admin/properties/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md transition"
                >
                    Add Property
                </Link>
                <Link
                    href="/admin/properties"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-md transition"
                >
                    Manage Properties
                </Link>
            </div>
        </div>
    )
}
