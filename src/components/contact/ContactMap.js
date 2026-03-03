'use client';

import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = [54.5, -3]; // center of the UK

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function ContactMap({ locations = [] }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const validLocations = useMemo(
    () =>
      locations.filter(
        (loc) =>
          loc?.latitude != null &&
          loc?.longitude != null &&
          !Number.isNaN(parseFloat(loc.latitude)) &&
          !Number.isNaN(parseFloat(loc.longitude))
      ),
    [locations]
  );

  const center = useMemo(() => {
    if (validLocations.length === 0) return DEFAULT_CENTER;
    const main = validLocations.find((l) => l.is_main === 1);
    const first = main || validLocations[0];
    return [parseFloat(first.latitude), parseFloat(first.longitude)];
  }, [validLocations]);

  useEffect(() => {
    if (!containerRef.current || validLocations.length === 0) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center,
      zoom: 12,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    validLocations.forEach((loc) => {
      const marker = L.marker([parseFloat(loc.latitude), parseFloat(loc.longitude)], {
        icon: defaultIcon,
      }).addTo(map);

      marker.bindPopup(
        `<div class="min-w-[200px]">
          <p class="font-semibold text-sm text-[var(--primary-blue-first)]">${loc.is_main === 1 ? 'Main branch' : ''}</p>
          <p class="font-medium text-gray-900 mt-0.5">${escapeHtml(loc.name)}</p>
          <p class="text-xs text-gray-600 mt-1 leading-snug">${escapeHtml(loc.address)}</p>
        </div>`,
        { maxWidth: 280 }
      );
    });

    const bounds = L.latLngBounds(
      validLocations.map((loc) => [parseFloat(loc.latitude), parseFloat(loc.longitude)])
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, validLocations]);

  if (validLocations.length === 0) {
    return (
      <div className="w-full h-full min-h-[320px] lg:min-h-[400px] bg-[#E8E8E8] flex items-center justify-center text-gray-500 text-sm">
        No locations to display
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[320px] lg:min-h-[400px] overflow-hidden shadow-[0px_2px_12px_#0000001A]">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[320px] lg:min-h-[400px] z-0"
        style={{ background: '#e8e8e8' }}
      />
    </div>
  );
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
