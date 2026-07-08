import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, WifiOff } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/components/maps/leafletIconFix';
import { parseDecimalCoordinates } from '@/lib/coordinates';
import { buildExternalMapUrl } from '@/lib/mapLinks';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { FitMapBounds } from '@/components/maps/FitMapBounds';
import { makeMarkerIcon, RISK_MARKER_COLORS } from '@/components/maps/mapMarkers';
import {
  DEFAULT_ZOOM,
  OSM_ATTRIBUTION,
  OSM_TILE_URL,
  PERU_CENTER,
} from '@/components/maps/mapDefaults';
import type { RescueExpeditionRiskLevel } from '@/services/rescue';

export type RescueExpeditionMapPoint = {
  expeditionId: string;
  label: string;
  sublabel: string;
  routeLabel: string;
  coordinates: string;
  riskLevel: RescueExpeditionRiskLevel;
  alertHref?: string;
};

export type RescueExpeditionsMapProps = {
  expeditions: RescueExpeditionMapPoint[];
  className?: string;
};

export function RescueExpeditionsMap({ expeditions, className }: RescueExpeditionsMapProps) {
  const online = useOnlineStatus();

  const markers = useMemo(() => {
    return expeditions.flatMap((exp) => {
      const parsed = parseDecimalCoordinates(exp.coordinates);
      if (!parsed) return [];
      return [
        {
          ...exp,
          position: [parsed.lat, parsed.lon] as [number, number],
        },
      ];
    });
  }, [expeditions]);

  const points = markers.map((m) => m.position);

  if (markers.length === 0) {
    return (
      <p className={`text-sm text-muted-foreground ${className ?? ''}`.trim()}>
        Sin coordenadas en las expediciones activas para mostrar el mapa.
      </p>
    );
  }

  if (!online) {
    return (
      <div
        className={`rounded-2xl border border-border bg-muted/40 p-4 text-sm ${className ?? ''}`.trim()}
      >
        <p className="flex items-center gap-2 text-muted-foreground mb-3">
          <WifiOff size={14} />
          Mapa no disponible sin conexión. Abre cada punto en mapas externo.
        </p>
        <div className="space-y-3">
          {markers.map((marker) => {
            const parsed = parseDecimalCoordinates(marker.coordinates);
            if (!parsed) return null;
            return (
              <div key={marker.expeditionId}>
                <p className="font-medium">{marker.label}</p>
                <p className="text-xs text-muted-foreground">{marker.routeLabel}</p>
                <a
                  href={buildExternalMapUrl(parsed.lat, parsed.lon)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-xs font-semibold mt-1"
                >
                  Abrir en mapas <ExternalLink size={12} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const center = points[0] ?? PERU_CENTER;

  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className ?? ''}`.trim()}>
        <MapContainer
          center={center}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={false}
          className="h-72 w-full z-0"
        >
          <TileLayer attribution={OSM_ATTRIBUTION} url={OSM_TILE_URL} />
          <FitMapBounds points={points} padding={[32, 32]} />
          {markers.map((marker) => (
            <Marker
              key={marker.expeditionId}
              position={marker.position}
              icon={makeMarkerIcon(RISK_MARKER_COLORS[marker.riskLevel], marker.riskLevel === 'red' ? 28 : 24)}
            >
              <Popup>
                <strong>{marker.label}</strong>
                <br />
                {marker.sublabel}
                <br />
                <span className="text-xs">{marker.routeLabel}</span>
                {marker.alertHref && (
                  <>
                    <br />
                    <Link to={marker.alertHref} className="text-xs font-semibold text-primary">
                      Ver ficha
                    </Link>
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
  );
}
