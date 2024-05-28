import React, { useState, useEffect } from 'react';
import {
  handleEdit,
  handleDelete,
  handleAddOrUpdate,
  handleFilterChange,
  getFilteredData,
  getTotalAmount,
  getUniqueMonths,
  getUniqueCategories,
} from '../Help/utils';
import incomeDataFile from '../data/incomeData';

function Income() {
  const [incomeData, setIncomeData] = useState(incomeDataFile);

  const [newIncome, setNewIncome] = useState({ name: '', amount: '', date: '', category: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [monthFilter, setMonthFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    console.log(incomeData); // Temporary log to verify data
  }, [incomeData]);

  const filteredData = getFilteredData(incomeData, monthFilter, categoryFilter);
  const totalAmount = getTotalAmount(filteredData);
  const uniqueMonths = getUniqueMonths(incomeData);
  const uniqueCategories = getUniqueCategories(incomeData);

  return (
    <div>
      <h1>Income</h1>
      <div>
        <label>
          Filter by Month:
          <select value={monthFilter} onChange={(e) => handleFilterChange(e, 'month', setMonthFilter, setCategoryFilter)}>
            <option value="">All</option>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by Category:
          <select value={categoryFilter} onChange={(e) => handleFilterChange(e, 'category', setMonthFilter, setCategoryFilter)}>
            <option value="">All</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((income, index) => (
            <tr key={index}>
              <td>{income.name}</td>
              <td>{income.amount.toFixed(2)} Euro</td>
              <td>{income.date}</td>
              <td>{income.category}</td>
              <td>
                <button onClick={() => handleEdit(index, incomeData, setNewIncome, setEditIndex)}>Edit</button>
                <button onClick={() => handleDelete(index, incomeData, setIncomeData, setNewIncome, setEditIndex)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{totalAmount} Euro</strong></td>
            <td colSpan="3"></td>
          </tr>
        </tbody>
      </table>

      <h2>{editIndex !== null ? 'Edit Income' : 'Add New Income'}</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newIncome.name}
          onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newIncome.amount}
          onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newIncome.date}
          onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newIncome.category}
          onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
        />
        <button onClick={() => handleAddOrUpdate(newIncome, setNewIncome, incomeData, setIncomeData, editIndex, setEditIndex)}>
          {editIndex !== null ? 'Update Income' : 'Add Income'}
        </button>
      </div>
    </div>
  );
}

export default Income;
