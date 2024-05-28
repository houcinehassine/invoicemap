import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MonthlyDataProvider } from './Help/MonthlyDataContext';
import Home from './Page/Home';
import Income from './Page/Income';
import MonthlyExpenses from './Page/MonthlyExpenses';
import ExtraExpenses from './Page/ExtraExpenses';
import PocketPayback from './Page/PocketPayback';
import Debts from './Page/Debts';
import Credit from './Page/Credit';
import Subscriptions from './Page/Subscriptions'; // Import Subscriptions

function App() {
  return (
    <MonthlyDataProvider>
      <Router>
        <div className="App">
          <div className="sidebar">
            <h2>Home</h2>
            <Link to="/home">Home</Link>
            <h2>Income</h2>
            <Link to="/income">Income</Link>
            <h2>Expenses</h2>
            <Link to="/monthly-expenses">Monthly Expenses</Link>
            <Link to="/extra-expenses">Extra Expenses</Link>
            <Link to="/pocket-payback">Pocket - PAYBACK</Link>
            <Link to="/subscriptions">Subscriptions</Link> {/* Add Subscriptions link */}
            <h2>Credit</h2>
            <Link to="/credit">TF Bank</Link>
            <Link to="/debts">Debts</Link>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/income" element={<Income />} />
              <Route path="/monthly-expenses" element={<MonthlyExpenses />} />
              <Route path="/extra-expenses" element={<ExtraExpenses />} />
              <Route path="/pocket-payback" element={<PocketPayback />} />
              <Route path="/debts" element={<Debts />} />
              <Route path="/credit" element={<Credit />} />
              <Route path="/subscriptions" element={<Subscriptions />} /> {/* Add Subscriptions route */}
            </Routes>
          </div>
        </div>
      </Router>
    </MonthlyDataProvider>
  );
}

export default App;