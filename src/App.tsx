import React from 'react';
import { CoinTable } from './components/CoinTable';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🪙 Crypto Dashboard</h1>
        <p>Real-time cryptocurrency prices powered by CoinGecko</p>
      </header>
      <main>
        <CoinTable />
      </main>
      <footer>
        <p>Data refreshed every 30 seconds • Prices in USD</p>
      </footer>
    </div>
  );
};

export default App;
