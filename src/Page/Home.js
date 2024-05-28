import React, { useContext } from 'react';
import { MonthlyDataContext } from '../Help/MonthlyDataContext';
import paybackData from '../data/paybackData';

function Home() {
  const monthlyData = useContext(MonthlyDataContext);

  // Funktion zur Berechnung der Gesamt-Restwerte für einen Monat
  const calculateTotalRestForMonth = (month) => {
    const paybackEntry = paybackData.find(entry => entry.name && entry.name === month);
    return paybackEntry ? (paybackEntry.allAmount - paybackEntry.notForMe) : 0;
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const monthNames = Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b));
  const rows = chunkArray(monthNames, 3);

  return (
    <div>
      <h1>Monthly Overview</h1>
      {rows.length === 0 && <p>No data available</p>}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          {row.map((month, index) => {
            const totalRest = calculateTotalRestForMonth(month);
            const totalExpenses = monthlyData[month].expenses + totalRest;
            const totalSavings = monthlyData[month].income - totalExpenses;
            return (
              <div key={index} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '300px' }}>
                <h3 style={{ textAlign: 'center' }}>{month}</h3>
                <p><span style={{ fontWeight: 'bold' }}>Income:</span> {monthlyData[month].income.toFixed(2)} Euro</p>
                <p><span style={{ fontWeight: 'bold' }}>Expenses:</span> {totalExpenses.toFixed(2)} Euro</p>
                <p style={{ fontWeight: 'bold', color: 'green' }}><span style={{ fontWeight: 'bold' }}>Savings:</span> {totalSavings.toFixed(2)} Euro</p>
                <p style={{ fontWeight: 'bold', color: 'red' }}><span style={{ fontWeight: 'bold' }}>Credit:</span> {monthlyData[month].credit.toFixed(2)} Euro</p>
                <p><span style={{ fontWeight: 'bold' }}>Actual Balance:</span> {monthlyData[month].actualBalance.toFixed(2)} Euro</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Home;
