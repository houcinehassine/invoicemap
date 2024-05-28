import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MonthlyDataProvider } from './Help/MonthlyDataContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = lazy(() => import('./Page/Home'));
const Income = lazy(() => import('./Page/Income'));
const MonthlyExpenses = lazy(() => import('./Page/MonthlyExpenses'));
const ExtraExpenses = lazy(() => import('./Page/ExtraExpenses'));
const PocketPayback = lazy(() => import('./Page/PocketPayback'));
const Debts = lazy(() => import('./Page/Debts'));
const Credit = lazy(() => import('./Page/Credit'));
const Subscriptions = lazy(() => import('./Page/Subscriptions'));

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
            <Link to="/subscriptions">Subscriptions</Link>
            <h2>Credit</h2>
            <Link to="/credit">TF Bank</Link>
            <Link to="/debts">Debts</Link>
          </div>
          <div className="content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/income" element={<Income />} />
                <Route path="/monthly-expenses" element={<MonthlyExpenses />} />
                <Route path="/extra-expenses" element={<ExtraExpenses />} />
                <Route path="/pocket-payback" element={<PocketPayback />} />
                <Route path="/debts" element={<Debts />} />
                <Route path="/credit" element={<Credit />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </MonthlyDataProvider>
  );
}

export default App;
