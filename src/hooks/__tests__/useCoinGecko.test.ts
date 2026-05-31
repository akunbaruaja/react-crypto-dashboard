import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCoinGecko } from '../hooks/useCoinGecko';

const mockCoins = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 50000,
    price_change_percentage_24h: 2.5,
    market_cap: 1000000000000,
    total_volume: 50000000000,
    sparkline_in_7d: { price: [49000, 50000, 51000] },
    image: 'https://example.com/btc.png',
  },
];

describe('useCoinGecko', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch coins successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCoins),
    });

    const { result } = renderHook(() => useCoinGecko());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.coins).toHaveLength(1);
    expect(result.current.coins[0].name).toBe('Bitcoin');
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useCoinGecko());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.coins).toHaveLength(0);
  });
});
