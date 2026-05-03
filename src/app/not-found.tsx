import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-gray-400">
        Oops! Page not found.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-red-700 rounded-lg hover:bg-red-900 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}