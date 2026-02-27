import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import type { Activity } from './MockData';

interface MapSectionProps {
  activities: Activity[];
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem',
};

const center = {
  lat: 59.3293,
  lng: 18.0686, // Stockholm
};

const MapSection: React.FC<MapSectionProps> = ({ activities }) => {
  // Normally you would get this from process.env or similar
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "", // Placeholder, would need a real key to work
  });

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const onLoad = useCallback(function callback() {
    // Optional: add logic here if you need to access map instance
  }, []);

  const onUnmount = useCallback(function callback() {
    // Optional: add logic here if you need to access map instance
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-gray-500 font-medium text-lg">Laddar karta...</div>
        <p className="text-gray-400 text-sm mt-2">(Ange Google Maps API-nyckel i koden för att visa riktig karta)</p>
        <div className="mt-4 flex gap-4 overflow-hidden p-2 opacity-50 grayscale pointer-events-none">
          {/* Mock visual representation of markers */}
          {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative shadow-lg rounded-2xl overflow-hidden mb-8 border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          styles: [
             {
              featureType: "poi",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            position={{ lat: activity.lat, lng: activity.lng }}
            onClick={() => setSelectedActivity(activity)}
            title={activity.title}
          />
        ))}

        {selectedActivity && (
          <InfoWindow
            position={{ lat: selectedActivity.lat, lng: selectedActivity.lng }}
            onCloseClick={() => setSelectedActivity(null)}
          >
            <div className="p-2 max-w-[200px]">
              <h3 className="font-bold text-gray-800 text-sm mb-1">{selectedActivity.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{selectedActivity.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-600">{selectedActivity.time}</span>
                <span className="text-xs text-gray-400">{selectedActivity.participants}/{selectedActivity.maxParticipants}</span>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapSection;
