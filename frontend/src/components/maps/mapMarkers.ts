import L from 'leaflet';

export const START_MARKER_COLOR = '#16a34a';
export const END_MARKER_COLOR = '#dc2626';

export const RISK_MARKER_COLORS = {
  green: '#16a34a',
  yellow: '#f59e0b',
  red: '#dc2626',
} as const;

export function makeMarkerIcon(color: string, size = 24) {
  const half = size / 2;
  return L.divIcon({
    className: 'treksafe-map-marker',
    iconSize: [size, size],
    iconAnchor: [half, half],
    popupAnchor: [0, -half],
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
  });
}
