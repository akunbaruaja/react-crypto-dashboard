import { useState, useEffect, useCallback } from 'react';

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: { price: number[] };
  image: string;
}

interface UseCoinGeckoReturn {
  coins: CoinPrice[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.coingecko.com/api/v3';
const REFRESH_INTERVAL = Number(import.meta.env.VITE_REFRESH_INTERVAL) || 30000;

export function useCoinGecko(currency = 'usd', perPage = 20): UseCoinGeckoReturn {
  const [coins, setCoins] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoins = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: String(perPage),
        page: '1',
        sparkline: 'true',
        price_change_percentage: '24h',
      });

      const resp = await fetch(`${API_BASE}/coins/markets?${params}`);
      if (!resp.ok) throw new Error(`API error: ${resp.status}`);

      const data = await resp.json();
      setCoins(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  }, [currency, perPage]);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchCoins]);

  return { coins, loading, error, refresh: fetchCoins };
}
