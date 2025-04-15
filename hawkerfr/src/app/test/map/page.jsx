"use client";

import dynamic from "next/dynamic";
import { FiMapPin } from "react-icons/fi";

// Use dynamic import with SSR disabled for the MapTest component
const MapTest = dynamic(() => import("@/tests/MapTest"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <FiMapPin className="text-orange-500 mb-4" size={36} />
      <p className="text-lg font-medium mb-2">Loading Map Test...</p>
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function MapTestPage() {
  return <MapTest />;
} 