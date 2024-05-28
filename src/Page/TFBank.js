import React, { useContext, useState, useEffect } from 'react';
import { MonthlyDataContext } from '../Help/MonthlyDataContext';

function TFBank() {
  const monthlyData = useContext(MonthlyDataContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Object.keys(monthlyData).length > 0) {
      const initialToPay = 3510;
      const initialCanUse = 8500 - initialToPay;

      const computedData = [];

      Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b)).forEach((month, index) => {
        const savedValue = Math.round(monthlyData[month].savings);

        const toPay = index === 0 ? initialToPay : computedData[index - 1].toPay - savedValue;
        const canUse = 8500 - toPay;
        const income = savedValue;

        computedData.push({
          name: month,
          toPay: toPay,
          canUse: canUse,
          income: income
        });
      });

      setData(computedData);
    }
  }, [monthlyData]);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows = chunkArray(data, 3);

  return (
    <div>
      <h1>TF Bank Overview</h1>
      {rows.length === 0 && <p>No data available</p>}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          {row.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '300px' }}>
              <h3 style={{ textAlign: 'center' }}>{item.name}</h3>
              <p><span style={{ fontWeight: 'bold' }}>To Pay:      </span> {item.toPay} Euro</p>
              <p><span style={{ fontWeight: 'bold' }}>Can be Used: </span>{item.canUse} Euro</p>
              <p><span style={{ fontWeight: 'bold' }}>Income:      </span> {item.income} Euro</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TFBank;

