import React from 'react';
import { useCoinGecko } from '../hooks/useCoinGecko';
import { formatCurrency, formatCompact, formatPercent, getPriceColor } from '../utils/format';
import { SparklineChart } from './SparklineChart';

export const CoinTable: React.FC = () => {
  const { coins, loading, error, refresh } = useCoinGecko();

  if (loading) return <div className="loading">Loading prices...</div>;
  if (error) return <div className="error">Error: {error} <button onClick={refresh}>Retry</button></div>;

  return (
    <div className="coin-table">
      <div className="table-header">
        <span className="col-rank">#</span>
        <span className="col-name">Coin</span>
        <span className="col-price">Price</span>
        <span className="col-change">24h %</span>
        <span className="col-volume">Volume</span>
        <span className="col-mcap">Market Cap</span>
        <span className="col-chart">7d Chart</span>
      </div>
      {coins.map((coin, i) => {
        const changeColor = getPriceColor(coin.price_change_percentage_24h);
        return (
          <div key={coin.id} className="table-row">
            <span className="col-rank">{i + 1}</span>
            <span className="col-name">
              <img src={coin.image} alt={coin.name} width={20} height={20} />
              <strong>{coin.name}</strong>
              <small>{coin.symbol.toUpperCase()}</small>
            </span>
            <span className="col-price">{formatCurrency(coin.current_price)}</span>
            <span className="col-change" style={{ color: changeColor }}>
              {formatPercent(coin.price_change_percentage_24h)}
            </span>
            <span className="col-volume">{formatCompact(coin.total_volume)}</span>
            <span className="col-mcap">{formatCompact(coin.market_cap)}</span>
            <span className="col-chart">
              <SparklineChart
                data={coin.sparkline_in_7d.price}
                color={changeColor}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};
