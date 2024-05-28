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
import extraExpensesData from '../data/extraExpensesData';

function ExtraExpenses() {
  const [expensesData, setExpensesData] = useState(extraExpensesData);

  const [newExpense, setNewExpense] = useState({ name: '', amount: '', date: '', category: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [monthFilter, setMonthFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    console.log(expensesData); // Temporary log to verify data
  }, [expensesData]);

  const filteredData = getFilteredData(expensesData, monthFilter, categoryFilter);
  const totalAmount = getTotalAmount(filteredData);
  const uniqueMonths = getUniqueMonths(expensesData);
  const uniqueCategories = getUniqueCategories(expensesData);

  return (
    <div>
      <h1>Extra Expenses</h1>
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
          {filteredData.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{expense.amount.toFixed(2)} Euro</td>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>
                <button onClick={() => handleEdit(index, expensesData, setNewExpense, setEditIndex)}>Edit</button>
                <button onClick={() => handleDelete(index, expensesData, setExpensesData, setNewExpense, setEditIndex)}>Delete</button>
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

      <h2>{editIndex !== null ? 'Edit Expense' : 'Add New Expense'}</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        />
        <button onClick={() => handleAddOrUpdate(newExpense, setNewExpense, expensesData, setExpensesData, editIndex, setEditIndex)}>
          {editIndex !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </div>
  );
}

export default ExtraExpenses;
