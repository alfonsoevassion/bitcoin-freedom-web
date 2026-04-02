import { useEffect, useState, forwardRef, type Ref } from 'react';

interface CountryData {
  name: { common: string };
  capital: string[];
  population: number;
  flags: { svg: string };
  region: string;
  languages: { [key: string]: string };
}

interface CountryInfoProps {
  countryCode: string | null;
  nodesCount: number;
  onClose: () => void;
}

const CountryInfo = forwardRef<HTMLDivElement, CountryInfoProps>(({ countryCode, nodesCount, onClose }: CountryInfoProps, ref: Ref<HTMLDivElement>) => {
  const [data, setData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countryCode) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(res => res.json())
        .then(resData => {
          setData(resData[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [countryCode]);

  if (!countryCode) return null;

  return (
    <div className="country-info-card" ref={ref}>
      <button className="close-btn" onClick={onClose}>×</button>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <img src={data.flags.svg} alt={data.name.common} className="country-flag" />
          <h2>{data.name.common}</h2>
          
          <div className="bitcoin-stats">
            <div className="stat-item">
              <label>Bitcoin Nodes</label>
              <div className="stat-value">{nodesCount.toLocaleString()}</div>
            </div>
          </div>

          <div className="info-grid">
            <p><strong>Capital:</strong> {data.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {data.region}</p>
            <p><strong>Population:</strong> {data.population.toLocaleString()}</p>
          </div>
        </>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
});

export default CountryInfo;
