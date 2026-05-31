import React, { useState } from 'react';
import { useCoinGecko } from '../hooks/useCoinGecko';
import { formatCurrency, formatPercent, getPriceColor } from '../utils/format';

interface PortfolioItem {
  coinId: string;
  amount: number;
  buyPrice: number;
}

export const PortfolioSummary: React.FC = () => {
  const { coins } = useCoinGecko();
  const [portfolio] = useState<PortfolioItem[]>([
    { coinId: 'bitcoin', amount: 0.5, buyPrice: 42000 },
    { coinId: 'ethereum', amount: 5, buyPrice: 2200 },
    { coinId: 'solana', amount: 100, buyPrice: 85 },
  ]);

  if (!coins.length) return null;

  const portfolioData = portfolio.map((item) => {
    const coin = coins.find((c) => c.id === item.coinId);
    if (!coin) return null;

    const currentValue = item.amount * coin.current_price;
    const costBasis = item.amount * item.buyPrice;
    const pnl = currentValue - costBasis;
    const pnlPercent = ((pnl / costBasis) * 100);

    return {
      ...item,
      name: coin.name,
      symbol: coin.symbol,
      currentPrice: coin.current_price,
      currentValue,
      costBasis,
      pnl,
      pnlPercent,
    };
  }).filter(Boolean);

  const totalValue = portfolioData.reduce((s, p) => s + (p?.currentValue || 0), 0);
  const totalCost = portfolioData.reduce((s, p) => s + (p?.costBasis || 0), 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPercent = (totalPnl / totalCost) * 100;

  return (
    <div className="portfolio-summary">
      <h2>Portfolio</h2>
      <div className="portfolio-total">
        <span className="total-value">{formatCurrency(totalValue)}</span>
        <span className="total-pnl" style={{ color: getPriceColor(totalPnlPercent) }}>
          {formatPercent(totalPnlPercent)} ({formatCurrency(totalPnl)})
        </span>
      </div>
      <div className="portfolio-items">
        {portfolioData.map((p) => p && (
          <div key={p.coinId} className="portfolio-item">
            <div className="item-name">
              <strong>{p.name}</strong>
              <small>{p.symbol.toUpperCase()}</small>
            </div>
            <div className="item-amount">{p.amount} {p.symbol.toUpperCase()}</div>
            <div className="item-value">{formatCurrency(p.currentValue)}</div>
            <div className="item-pnl" style={{ color: getPriceColor(p.pnlPercent) }}>
              {formatPercent(p.pnlPercent)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
