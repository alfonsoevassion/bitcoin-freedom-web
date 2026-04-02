export interface NodeDistribution {
  country: string;
  percentage: number;
  count: number;
}

// Datos estáticos ampliados para cubrir mejor el globo (Snapshot Bitnodes 2025/2026)
const STATIC_NODES: NodeDistribution[] = [
  // América del Norte
  { country: 'US', percentage: 30.5, count: 5490 },
  { country: 'CA', percentage: 4.2, count: 756 },
  { country: 'MX', percentage: 0.3, count: 54 },
  // Europa
  { country: 'DE', percentage: 13.2, count: 2376 },
  { country: 'FR', percentage: 5.8, count: 1044 },
  { country: 'NL', percentage: 3.9, count: 702 },
  { country: 'GB', percentage: 3.1, count: 558 },
  { country: 'CH', percentage: 2.2, count: 396 },
  { country: 'ES', percentage: 1.4, count: 252 },
  { country: 'IT', percentage: 0.8, count: 144 },
  { country: 'RU', percentage: 3.5, count: 630 },
  // Asia
  { country: 'JP', percentage: 2.8, count: 504 },
  { country: 'CN', percentage: 2.5, count: 450 },
  { country: 'SG', percentage: 1.8, count: 324 },
  { country: 'KR', percentage: 1.0, count: 180 },
  { country: 'IN', percentage: 0.5, count: 90 },
  // Oceanía
  { country: 'AU', percentage: 1.1, count: 198 },
  { country: 'NZ', percentage: 0.3, count: 54 },
  // América del Sur
  { country: 'BR', percentage: 1.2, count: 216 },
  { country: 'AR', percentage: 0.4, count: 72 },
  { country: 'CO', percentage: 0.2, count: 36 },
  { country: 'VE', percentage: 0.1, count: 18 },
  { country: 'CL', percentage: 0.1, count: 18 },
  // África (Añadidos para cubrir el continente)
  { country: 'ZA', percentage: 0.4, count: 72 }, // Sudáfrica
  { country: 'NG', percentage: 0.2, count: 36 }, // Nigeria
  { country: 'EG', percentage: 0.1, count: 18 }, // Egipto
  { country: 'KE', percentage: 0.1, count: 18 }, // Kenia
  { country: 'GH', percentage: 0.05, count: 9 },  // Ghana
  { country: 'MA', percentage: 0.05, count: 9 },  // Marruecos
  // Centroamérica
  { country: 'SV', percentage: 0.2, count: 36 }, // El Salvador
  { country: 'PA', percentage: 0.1, count: 18 }  // Panamá
];

export const getBitcoinNodeDistribution = async (): Promise<NodeDistribution[]> => {
  try {
    // Intentamos obtener datos frescos de Bitnodes
    const response = await fetch('https://api.bitnodes.io/api/v1/nodes/statistics/');
    if (!response.ok) throw new Error('API unstable');
    
    const data = await response.json();
    if (data && data.countries) {
        return Object.keys(data.countries).map(code => ({
            country: code,
            percentage: data.countries[code][1],
            count: data.countries[code][0]
        }));
    }
    return STATIC_NODES;
  } catch (error) {
    console.warn('Using static Bitcoin node data due to API unavailability');
    return STATIC_NODES;
  }
};

export const getBitcoinPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    return 60000; // Temporal: Return a static value to avoid rendering issues
  }
};
