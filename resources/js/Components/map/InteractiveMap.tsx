import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface InteractiveMapProps {
  lat: number;
  lng: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

interface LocationMarkerProps {
  lat: number;
  lng: number;
  onLocationSelect: (lat: number, lng: number) => void;
  mapRef: React.MutableRefObject<LeafletMap | null>;
}

// Component to handle map clicks
function LocationMarker({
  lat,
  lng,
  onLocationSelect,
  mapRef,
}: LocationMarkerProps) {
  const [position, setPosition] = useState<[number, number]>([lat, lng]);
  const map = useMapEvents({
    click(e) {
      const { lat: clickLat, lng: clickLng } = e.latlng;
      setPosition([clickLat, clickLng]);
      // Don't change zoom - just update position, keep user's zoom
      onLocationSelect(clickLat, clickLng);
    },
  });

  useEffect(() => {
    setPosition([lat, lng]);
  }, [lat, lng]);

  return position ? (
    <Marker position={position}>
      <Popup>
        Lat: {position[0].toFixed(4)}
        <br />
        Lng: {position[1].toFixed(4)}
      </Popup>
    </Marker>
  ) : null;
}

/**
 * Interactive Map Component using Leaflet
 * Allows users to click on the map to select location coordinates
 * When country changes, zooms to level 12 to show country overview
 * When clicking on map, preserves the user's current zoom level
 */
export function InteractiveMap({
  lat,
  lng,
  onLocationSelect,
}: InteractiveMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const prevLatRef = useRef<number | null>(null);
  const prevLngRef = useRef<number | null>(null);

  // Validate coordinates
  const validLat = Math.max(-90, Math.min(90, lat || 0));
  const validLng = Math.max(-180, Math.min(180, lng || 0));

  // Detect if coordinates changed from form (country selection)
  // When country changes significantly, zoom to 12 to show the country
  useEffect(() => {
    if (mapRef.current) {
      const distance =
        Math.abs((prevLatRef.current || 0) - lat) +
        Math.abs((prevLngRef.current || 0) - lng);

      // If coordinates changed significantly (country selection), zoom to 12
      if (distance > 5) {
        mapRef.current.setView([validLat, validLng], 12);
      } else if (distance > 0) {
        // Small change, just pan without changing zoom
        mapRef.current.setView([validLat, validLng], mapRef.current.getZoom());
      }

      prevLatRef.current = lat;
      prevLngRef.current = lng;
    }
  }, [lat, lng, validLat, validLng]);

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{ height: '500px', width: '100%' }}
    >
      <MapContainer
        ref={mapRef}
        center={[validLat, validLng] as [number, number]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          lat={validLat}
          lng={validLng}
          onLocationSelect={onLocationSelect}
          mapRef={mapRef}
        />
      </MapContainer>
    </div>
  );
}
