import { useEffect, useState, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import type { NodeDistribution } from '../services/bitcoinService';

interface Country {
  properties: {
    ADMIN: string;
    ISO_A2: string;
    [key: string]: any;
  };
  bbox?: number[];
  geometry: any;
  [key: string]: any;
}

interface GlobeComponentProps {
  onCountrySelect: (country: Country | null) => void;
  selectedCountryCode: string | null;
  nodesData: NodeDistribution[];
}

// Coordenadas manuales para países grandes o problemáticos para asegurar que la barra aparezca centrada
const COUNTRY_CENTERS: { [key: string]: { lat: number, lng: number } } = {
  'RU': { lat: 61.524, lng: 105.318 }, // Rusia (Centro real en Siberia)
  'US': { lat: 37.090, lng: -95.712 },  // EE.UU.
  'CA': { lat: 56.130, lng: -106.346 }, // Canadá
  'CN': { lat: 35.861, lng: 104.195 },  // China
  'AU': { lat: -25.274, lng: 133.775 }, // Australia
  'BR': { lat: -14.235, lng: -51.925 }, // Brasil
  'IN': { lat: 20.593, lng: 78.962 },   // India
};

const GlobeComponent = ({ onCountrySelect, selectedCountryCode, nodesData }: GlobeComponentProps) => {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<{ features: Country[] }>({ features: [] });
  const [hoverD, setHoverD] = useState<Country | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const BTC_GOLD = '#F7931A';
  const BTC_GOLD_RGBA = (opacity: number) => `rgba(247, 147, 26, ${opacity})`;

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);

    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height
          });
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const hexData = useMemo(() => {
    if (countries.features.length === 0 || nodesData.length === 0) return [];
    
    return countries.features.map(f => {
      const iso = f.properties.ISO_A2;
      const nodeCountry = nodesData.find(n => n.country === iso);
      if (!nodeCountry || nodeCountry.count === 0) return null;

      let lat = 0, lng = 0;

      // 1. Intentar usar coordenadas manuales si existen
      if (COUNTRY_CENTERS[iso]) {
        lat = COUNTRY_CENTERS[iso].lat;
        lng = COUNTRY_CENTERS[iso].lng;
      } 
      // 2. Intentar usar bbox si existe
      else if (f.bbox) {
        lat = (f.bbox[1] + f.bbox[3]) / 2;
        lng = (f.bbox[0] + f.bbox[2]) / 2;
      } 
      // 3. Fallback a la geometría
      else {
        try {
          if (f.geometry.type === 'Polygon') {
            lat = f.geometry.coordinates[0][0][1];
            lng = f.geometry.coordinates[0][0][0];
          } else if (f.geometry.type === 'MultiPolygon') {
            lat = f.geometry.coordinates[0][0][0][1];
            lng = f.geometry.coordinates[0][0][0][0];
          }
        } catch (e) {
          return null; // Si no hay forma de posicionar, saltar
        }
      }

      return {
        lat,
        lng,
        size: Math.log10(nodeCountry.count) * 0.15, // Aumentado ligeramente para mejor visibilidad
        label: `${f.properties.ADMIN}: ${nodeCountry.count} nodes`
      };
    }).filter(d => d !== null);
  }, [countries.features, nodesData]);

  const isHighlighted = (d: object | null): d is Country => {
    if (!d) return false;
    if (!('properties' in d) || typeof d.properties !== 'object' || !d.properties || !('ISO_A2' in d.properties)) {
      return false;
    }
    const country = d as Country;
    return country === hoverD || (selectedCountryCode !== null && country.properties.ISO_A2 === selectedCountryCode);
  };

  return (
    <div className="globe-container" ref={containerRef}>
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // Países
        polygonsData={countries.features}
        polygonAltitude={d => isHighlighted(d) ? 0.05 : 0.01}
        polygonCapColor={d => isHighlighted(d) ? BTC_GOLD_RGBA(0.4) : BTC_GOLD_RGBA(0.05)}
        polygonSideColor={() => BTC_GOLD_RGBA(0.05)}
        polygonStrokeColor={() => BTC_GOLD_RGBA(0.3)} // Bordes más finos y sutiles
                onPolygonHover={(_polygon: object | null, _prevPolygon: object | null) => {
          setHoverD(_polygon as Country | null);
        }}
        onPolygonClick={(d: object | null, _event: MouseEvent, _coordinates: { lat: number; lng: number }) => { 
          if (globeEl.current) {

          }
          if (!d || !('properties' in d) || typeof d.properties !== 'object' || !d.properties || !('ISO_A2' in d.properties)) {
            onCountrySelect(null); 
            return;
          }
          const country = d as Country; 
          const code = country.properties.ISO_A2 && country.properties.ISO_A2 !== '-99'
            ? country.properties.ISO_A2
            : country.properties.ADM0_A3;
          
          onCountrySelect({...country, properties: { ...country.properties, finalCode: code }});
        }}


        pointsData={hexData}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => BTC_GOLD}
        pointAltitude="size"
        pointRadius={0.7} // Barras un poco más gruesas
        pointsTransitionDuration={0}
        
        polygonLabel={({ properties: d }: any) => `
          <div class="globe-tooltip" style="border-color: ${BTC_GOLD}; box-shadow: 0 0 10px ${BTC_GOLD_RGBA(0.3)}">
            <b>${d.ADMIN} (${d.ISO_A2})</b>
          </div>
        `}
      />
    </div>
  );
};

export default GlobeComponent;
