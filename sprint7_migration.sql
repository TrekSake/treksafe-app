-- Sprint 7: coordenadas manuales en expediciones (HU-23)
ALTER TABLE expeditions
  ADD COLUMN IF NOT EXISTS start_coordinates VARCHAR(32),
  ADD COLUMN IF NOT EXISTS end_coordinates VARCHAR(32);

COMMENT ON COLUMN expeditions.start_coordinates IS 'Coordenadas decimales "lat,lon" del punto de salida.';
COMMENT ON COLUMN expeditions.end_coordinates IS 'Coordenadas decimales "lat,lon" del destino.';
