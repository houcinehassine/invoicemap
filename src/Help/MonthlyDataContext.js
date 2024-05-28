import React, { createContext, useState, useEffect } from 'react';
import { aggregateMonthlyData } from './utils';
import incomeData from '../data/incomeData';
import extraExpensesData from '../data/extraExpensesData';
import monthlyExpensesData from '../data/monthlyExpensesData';
import paybackData from '../data/paybackData';

export const MonthlyDataContext = createContext();

export const MonthlyDataProvider = ({ children }) => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const aggregatedData = aggregateMonthlyData(incomeData, extraExpensesData, monthlyExpensesData, paybackData);
    setMonthlyData(aggregatedData);
  }, []);

  return (
    <MonthlyDataContext.Provider value={monthlyData}>
      {children}
    </MonthlyDataContext.Provider>
  );
};
