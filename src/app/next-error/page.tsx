"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Login Failed
        </h2>

        {/* Error Message */}
        <p className="mt-2 text-sm text-gray-600">
          {decodeURIComponent(error || "Something went wrong. Please try again.")}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/sign-in"
            className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Back to Login
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
