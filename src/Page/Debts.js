import React, { useState, useEffect } from 'react';
import { aggregateDebtData } from '../Help/utils';
import incomeData from '../data/incomeData';
import extraExpensesData from '../data/extraExpensesData';

function Debts() {
  const [debtData, setDebtData] = useState([]);

  useEffect(() => {
    const aggregatedData = aggregateDebtData(incomeData, extraExpensesData);
    setDebtData(aggregatedData);
  }, []);

  const getCardStyle = (open) => {
    if (open < 0) {
      return { backgroundColor: 'red', color: 'white' };
    } else if (open === 0) {
      return { backgroundColor: 'blue', color: 'white' };
    } else {
      return { backgroundColor: 'green', color: 'white' };
    }
  };

  return (
    <div>
      <h1>Debts Overview</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {debtData.map((debt, index) => (
          <div key={index} style={{ ...getCardStyle(debt.open), border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '200px' }}>
            <h3>{debt.name}</h3>
            <p>Took: {debt.took.toFixed(2)} Euro</p>
            <p>Gave: {debt.gave.toFixed(2)} Euro</p>
            <p>Open: {debt.open.toFixed(2)} Euro</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Debts;
