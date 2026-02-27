import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import type { Activity } from './MockData';
import { OverlayView } from "@react-google-maps/api";

interface MapSectionProps {
  activities: Activity[];
  setChosenActivity: (id:number) => void
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem',
};

const MapSection: React.FC<MapSectionProps> = ({ activities, setChosenActivity }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  // Memoize libraries to prevent unnecessary re-renders
  const libraries = useMemo(() => ['marker', 'places'], []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    libraries: libraries as ("marker" | "places")[]
  });

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Stockholm default center
  const center = useMemo(() => ({
    lat: 59.3293,
    lng: 18.0686,
  }), []);

  const onLoad = useCallback((map: google.maps.Map) => {
    if (activities.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      activities.forEach((activity) => {
        bounds.extend({ lat: activity.lat, lng: activity.lng });
      });
      map.fitBounds(bounds);
    }
  }, [activities]);

  if (loadError) {
    return (
      <div className="w-full h-[400px] bg-red-50 rounded-2xl flex flex-col items-center justify-center border-2 border-red-200 p-6 text-center">
        <p className="text-red-600 font-bold">Kunde inte ladda kartan</p>
        <p className="text-red-500 text-sm mt-2">{loadError.message}</p>
        <p className="text-xs text-red-400 mt-4">Kontrollera din API-nyckel i .env.local och att Maps JavaScript API är aktiverat.</p>
      </div>
    );
  }

  if (!isLoaded || !apiKey) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-gray-500 font-medium text-lg italic">Laddar karta...</div>
        {!apiKey && <p className="text-red-400 text-xs mt-2">API-nyckel saknas i miljövariabler</p>}
      </div>
    );
  }

  const monoChromeStyle = [
    {
      featureType: "all",
      stylers: [{ saturation: -100 }]
    },
    {
      featureType: "poi", // Döljer intressepunkter som du redan hade i din kod
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "water",
      stylers: [{ color: "#c9c9c9" }]
    }
  ];

  return (
    <div className="w-full relative shadow-lg rounded-2xl overflow-hidden mb-8 border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          // Using a mapId is recommended for Advanced Markers to avoid the deprecation warning
          // mapId: 'YOUR_MAP_ID', 
          styles: monoChromeStyle
        }}
      >

        {activities.map((activity) => (
          <MarkerF
            key={activity.id}
            position={{ lat: activity.lat, lng: activity.lng }}
            onClick={() => setChosenActivity(activity.id)}
            onMouseOver={() => setSelectedActivity(activity)}
            title={activity.title}
          />
        ))}
        
        {selectedActivity && (
          <OverlayView
            position={{ lat: selectedActivity.lat, lng: selectedActivity.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="relative -translate-x-30  -translate-y-60">
              
              {/* Card */}
              <div className="w-56 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <img
                  src="/volleyball.png"
                  className="w-full h-24 object-cover block"
                />

                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedActivity.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {selectedActivity.location}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs font-semibold text-blue-600">
                      {selectedActivity.time}
                    </span>

                    <span className="text-xs text-gray-400">
                      {selectedActivity.participants}/{selectedActivity.maxParticipants}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pointer Arrow */}
              <div className="w-3 h-3 bg-white rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1 shadow-md border-r border-b border-gray-100"></div>
            </div>
          </OverlayView>
        )}      
      </GoogleMap>
    </div>
  );
};

export default MapSection;
