import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Arab MLS</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Explore top properties, manage your listings, and connect with real estate professionals — all in one platform.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/properties?page=1"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md transition"
        >
          View Properties
        </Link>

        <Link
          href="/admin"
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-md transition"
        >
          Admin
        </Link>
      </div>
    </main>
  );
}
