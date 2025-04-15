"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled for the FrontendTest component
const FrontendTest = dynamic(() => import("@/tests/FrontendTest"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <p className="text-lg font-medium mb-2">Loading Test Suite...</p>
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function TestPage() {
  return <FrontendTest />;
} 