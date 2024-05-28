import React, { useState, useEffect } from 'react';
import paybackDataFile from '../data/paybackData';
import {
  handleEdit,
  handleDelete,
  handleAddOrUpdate,
  handleFilterChange,
  getFilteredData,
  getTotalAmount,
  getUniqueValues,
} from '../Help/utils';

function PocketPayback() {
  const [paybackData, setPaybackData] = useState(paybackDataFile);
  const [newPayback, setNewPayback] = useState({ name: '', allAmount: '', notForMe: '', limitUsed: '', rest: '', overUsed: '', punkte: '', pointsInEuro: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [monthFilter, setMonthFilter] = useState('');

  useEffect(() => {
    const updatedData = paybackData.map(item => ({
      ...item,
      rest: (item.allAmount - item.notForMe).toFixed(2),
      overUsed: ((item.allAmount - item.notForMe - item.limitUsed) || 0).toFixed(2),
      pointsInEuro: ((item.punkte / 100) || 0).toFixed(2),
    }));
    setPaybackData(updatedData);
  }, []);

  const filteredData = getFilteredData(paybackData, monthFilter, '');
  const totalAmount = getTotalAmount(filteredData);
  const uniqueMonths = getUniqueValues(paybackData, 'name');

  return (
    <div>
      <h1>Pocket PAYBACK 24</h1>
      <div>
        <label>
          Filter by Month:
          <select value={monthFilter} onChange={(e) => handleFilterChange(e, 'name', setMonthFilter, () => {})}>
            <option value="">All</option>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>All Amount</th>
            <th>Not For Me</th>
            <th>Limit Used</th>
            <th>Rest</th>
            <th>Over Used</th>
            <th>Points</th>
            <th>Points in Euro</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((payback, index) => (
            <tr key={index}>
              <td>{payback.name}</td>
              <td>{payback.allAmount.toFixed(2)} €</td>
              <td>{payback.notForMe.toFixed(2)} €</td>
              <td>{payback.limitUsed.toFixed(2)} €</td>
              <td>{payback.rest} €</td>
              <td>{payback.overUsed} €</td>
              <td>{payback.punkte}</td>
              <td>{payback.pointsInEuro} €</td>
              <td>
                <button onClick={() => handleEdit(index, paybackData, setNewPayback, setEditIndex)}>Edit</button>
                <button onClick={() => handleDelete(index, paybackData, setPaybackData, setNewPayback, setEditIndex)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{totalAmount} €</strong></td>
            <td colSpan="7"></td>
          </tr>
        </tbody>
      </table>
      <h2>{editIndex !== null ? 'Edit Payback' : 'Add New Payback'}</h2>
      <div>
        <input
          type="text"
          placeholder="Month"
          value={newPayback.name}
          onChange={(e) => setNewPayback({ ...newPayback, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="All Amount"
          value={newPayback.allAmount}
          onChange={(e) => setNewPayback({ ...newPayback, allAmount: e.target.value })}
        />
        <input
          type="number"
          placeholder="Not For Me"
          value={newPayback.notForMe}
          onChange={(e) => setNewPayback({ ...newPayback, notForMe: e.target.value })}
        />
        <input
          type="number"
          placeholder="Limit Used"
          value={newPayback.limitUsed}
          onChange={(e) => setNewPayback({ ...newPayback, limitUsed: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rest"
          value={newPayback.rest}
          onChange={(e) => setNewPayback({ ...newPayback, rest: e.target.value })}
        />
        <input
          type="number"
          placeholder="Over Used"
          value={newPayback.overUsed}
          onChange={(e) => setNewPayback({ ...newPayback, overUsed: e.target.value })}
        />
        <input
          type="number"
          placeholder="Points"
          value={newPayback.punkte}
          onChange={(e) => setNewPayback({ ...newPayback, punkte: e.target.value })}
        />
        <input
          type="number"
          placeholder="Points in Euro"
          value={newPayback.pointsInEuro}
          onChange={(e) => setNewPayback({ ...newPayback, pointsInEuro: e.target.value })}
        />
        <button onClick={() => handleAddOrUpdate(newPayback, setNewPayback, paybackData, setPaybackData, editIndex, setEditIndex)}>
          {editIndex !== null ? 'Update Payback' : 'Add Payback'}
        </button>
      </div>
    </div>
  );
}

export default PocketPayback;

