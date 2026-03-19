import React, { useState, useEffect } from 'react';

interface BitcoinStats {
  priceUsd: number;
  priceEur: number;
  blockHeight: number;
  fastestFee: number;
  nextHalvingBlock: number;
}

const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<BitcoinStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Fetch Price from CoinGecko
      const priceRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur');
      const priceData = await priceRes.json();

      // Fetch Network Stats from Mempool.space
      const blockRes = await fetch('https://mempool.space/api/blocks/tip/height');
      const blockHeight = await blockRes.json();

      const feesRes = await fetch('https://mempool.space/api/v1/fees/recommended');
      const feesData = await feesRes.json();

      const HALVING_INTERVAL = 210000;
      const nextHalvingBlock = Math.ceil(blockHeight / HALVING_INTERVAL) * HALVING_INTERVAL;

      setStats({
        priceUsd: priceData.bitcoin.usd,
        priceEur: priceData.bitcoin.eur,
        blockHeight: blockHeight,
        fastestFee: feesData.fastestFee,
        nextHalvingBlock: nextHalvingBlock
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Bitcoin stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return <div className="loading">Sincronizando con la red...</div>;
  }

  const blocksToHalving = stats.nextHalvingBlock - stats.blockHeight;

  return (
    <div className="live-stats-container">
      <div className="stat-card">
        <span className="stat-label">Precio Actual</span>
        <span className="stat-value">{stats.priceEur.toLocaleString()} €</span>
        <span className="stat-sub">({stats.priceUsd.toLocaleString()} USD)</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Altura del Bloque</span>
        <span className="stat-value">#{stats.blockHeight.toLocaleString()}</span>
        <span className="stat-sub">Libro mayor actualizado</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Tarifa de Red</span>
        <span className="stat-value">{stats.fastestFee} sat/vB</span>
        <span className="stat-sub">Prioridad alta</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Próximo Halving</span>
        <span className="stat-value">{blocksToHalving.toLocaleString()} bloques</span>
        <span className="stat-sub">Escasez en aumento</span>
      </div>
    </div>
  );
};

export default LiveStats;
