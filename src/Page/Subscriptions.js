import React, { useState, useEffect } from 'react';
import monthlyExpensesData from '../data/monthlyExpensesData';
import extraExpensesData from '../data/extraExpensesData';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Filter the data to get subscriptions
    const monthlySubscriptions = monthlyExpensesData
      .filter(item => item.category === 'Subscription')
      .map(item => ({ ...item, category: 'Monthly' }));
    const yearlySubscriptions = extraExpensesData
      .filter(item => item.category === 'Subscription')
      .map(item => ({ ...item, category: 'Yearly' }));
    
    // Combine the filtered data
    const combinedSubscriptions = [...monthlySubscriptions, ...yearlySubscriptions];
    setSubscriptions(combinedSubscriptions);

    // Calculate total amount
    const total = combinedSubscriptions.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(total);
  }, []);

  // Ensure totalAmount is a number and then use toFixed
  const displayTotalAmount = !isNaN(totalAmount) ? totalAmount.toFixed(2) : '0.00';

  return (
    <div>
      <h1>Subscriptions</h1>
      {subscriptions.length === 0 && <p>No subscriptions found.</p>}
      {subscriptions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.amount.toFixed(2)} Euro</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Total Amount: {displayTotalAmount} Euro</h2>
    </div>
  );
};

export default Subscriptions;

