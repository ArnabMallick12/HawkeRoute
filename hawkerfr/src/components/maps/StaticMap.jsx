"use client";

import { useState, useEffect } from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import toast from "react-hot-toast";

export default function StaticMap({ 
  latitude, 
  longitude, 
  title = "Location",
  className = "", 
  showNavigation = true
}) {
  const [address, setAddress] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Check if we're in browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Try to get address from coordinates using reverse geocoding
  useEffect(() => {
    if (!isBrowser) return;
    if (!latitude || !longitude) return;
    
    const getAddress = async () => {
      try {
        // Use this API only in production, disable in development to avoid rate limits
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { 
              headers: { 
                "Accept-Language": "en",
                "User-Agent": "HawkerRoute/1.0" // Add a user agent to comply with usage policy
              } 
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    
    getAddress();
  }, [latitude, longitude, isBrowser]);
  
  const handleNavigate = () => {
    // Check if the device supports geolocation
    if (typeof window === 'undefined' || !navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }
    
    toast.success("Opening navigation to hawker location", {
      icon: "🧭",
    });
    
    // Open in Google Maps
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };
  
  if (!latitude || !longitude) {
    return (
      <div className={`bg-gray-100 rounded flex items-center justify-center p-4 ${className}`}>
        <p className="text-gray-800 text-sm">Location not available</p>
      </div>
    );
  }
  
  return (
    <div className={`relative rounded overflow-hidden ${className}`}>
      {/* Map rendering - use a fallback static UI instead of unreliable external service */}
      <div 
        className="w-full h-full bg-gray-100 flex flex-col items-center justify-center"
        style={{
          minHeight: '200px',
        }}
      >
        {/* Map pin in center */}
        <div className="mb-2">
          <FiMapPin className="text-orange-500" size={32} />
        </div>
        
        {/* Coordinates display */}
        <p className="text-sm text-gray-800 mb-2 font-medium">
          Location: {parseFloat(latitude).toFixed(6)}, {parseFloat(longitude).toFixed(6)}
        </p>
        
        {/* Google Maps link */}
        <a 
          href={`https://www.google.com/maps?q=${latitude},${longitude}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline text-sm font-medium"
        >
          View on Google Maps
        </a>
        
        {/* Navigation button - only show in browser */}
        {isBrowser && showNavigation && (
          <button
            onClick={handleNavigate}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded shadow-lg hover:bg-orange-600 transition-colors flex items-center"
            aria-label="Get directions"
          >
            <FiNavigation size={16} className="mr-2" /> Get Directions
          </button>
        )}
        
        {/* Location info */}
        {(title || address) && (
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3">
            <h4 className="font-medium text-sm text-gray-900">{title}</h4>
            {address && (
              <p className="text-xs text-gray-800 mt-1 truncate">{address}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 