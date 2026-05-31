# react-crypto-dashboard

Real-time cryptocurrency price dashboard built with React, TypeScript, and Recharts.

## Features

- Live price updates for top cryptocurrencies
- 7-day price history charts
- Portfolio value tracking
- Price change alerts (24h %)
- Responsive design
- Dark theme

## Screenshot

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a2e/00d4ff?text=Crypto+Dashboard)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Recharts for data visualization
- CoinGecko free API (no key needed)

## Configuration

Create `.env` for optional settings:

```env
VITE_API_BASE=https://api.coingecko.com/api/v3
VITE_REFRESH_INTERVAL=30000
```

## License

MIT
