import React, { useState } from 'react';

const FreedomCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [years, setYears] = useState<number>(5);

  // Approximate historical data (simplified for demonstration)
  // Avg Euro Inflation: ~3-5% yearly (compounded)
  // Avg Bitcoin CAGR: ~60% (conservative historical average)
  const euroInflationRate = 0.04; 
  const btcGrowthRate = 0.60;

  const finalEuroValue = amount * Math.pow(1 - euroInflationRate, years);
  const finalBtcValue = amount * Math.pow(1 + btcGrowthRate, years);

  return (
    <div className="calculator-container">
      <div className="calc-inputs">
        <div className="input-group">
          <label>Capital Inicial (€)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label>Horizonte Temporal (Años)</label>
          <input 
            type="range" 
            min="1" 
            max="15" 
            value={years} 
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <span className="years-display">{years} años</span>
        </div>
      </div>

      <div className="calc-results">
        <div className="result-card fiat">
          <h4>Poder Adquisitivo Fiat</h4>
          <span className="result-value">{finalEuroValue.toLocaleString(undefined, {maximumFractionDigits: 2})} €</span>
          <p>Tu dinero ha perdido un <strong>{((1 - finalEuroValue/amount) * 100).toFixed(1)}%</strong> de su valor real debido a la inflación.</p>
        </div>

        <div className="result-card btc">
          <h4>Poder Adquisitivo Bitcoin</h4>
          <span className="result-value">{finalBtcValue.toLocaleString(undefined, {maximumFractionDigits: 0})} €*</span>
          <p>Basado en el crecimiento histórico, tu soberanía financiera se ha multiplicado.</p>
          <small>*Proyección basada en promedios históricos. El rendimiento pasado no garantiza resultados futuros.</small>
        </div>
      </div>
    </div>
  );
};

export default FreedomCalculator;
