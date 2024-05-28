// src/utils.js
export const handleEdit = (index, data, setNewData, setEditIndex) => {
    setNewData(data[index]);
    setEditIndex(index);
  };
  
  export const handleDelete = (index, data, setData, setNewData, setEditIndex) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    if (setEditIndex === index) {
      setNewData({ name: '', amount: '', date: '', category: '' });
      setEditIndex(null);
    }
  };
  
  export const handleAddOrUpdate = (newData, setNewData, data, setData, editIndex, setEditIndex) => {
    if (newData.name && newData.amount && newData.date && newData.category) {
      const parsedAmount = parseFloat(newData.amount).toFixed(2);
      if (isNaN(parsedAmount)) {
        alert('Amount must be a number');
        return;
      }
      if (editIndex !== null) {
        const updatedData = data.map((item, index) =>
          index === editIndex ? { ...newData, amount: parseFloat(parsedAmount) } : item
        );
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, { ...newData, amount: parseFloat(parsedAmount) }]);
      }
      setNewData({ name: '', amount: '', date: '', category: '' });
    } else {
      alert('Please fill in all fields');
    }
  };
  
  export const handleFilterChange = (e, filterType, setMonthFilter, setCategoryFilter) => {
    if (filterType === 'month') {
      setMonthFilter(e.target.value);
    } else if (filterType === 'category') {
      setCategoryFilter(e.target.value);
    }
  };
  
  export const getFilteredData = (data, monthFilter, categoryFilter) => {
    return data.filter((item) => {
      const monthMatches = monthFilter ? item.date?.startsWith(monthFilter) : true;
      const categoryMatches = categoryFilter ? item.category === categoryFilter : true;
      return monthMatches && categoryMatches;
    });
  };
  
  export const getTotalAmount = (data) => {
    return data.reduce((total, item) => total + item.amount, 0).toFixed(2);
  };
  
  export const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
  };
  
  export const getUniqueMonths = (data) => {
    return [...new Set(data.map((item) => item.date?.slice(0, 7)).filter(Boolean))];
  };
  
  export const getUniqueCategories = (data) => {
    return [...new Set(data.map((item) => item.category))];
  };
  
  export const aggregateDebtData = (incomeData, extraExpensesData) => {
    const aggregatedData = {};
  
    incomeData.forEach(item => {
      if (item.category === 'Debts') {
        if (!aggregatedData[item.name]) {
          aggregatedData[item.name] = { name: item.name, took: 0, gave: 0, open: 0 };
        }
        aggregatedData[item.name].took += item.amount;
        aggregatedData[item.name].open += item.amount;
      }
    });
  
    extraExpensesData.forEach(item => {
      if (item.category === 'Debts') {
        if (!aggregatedData[item.name]) {
          aggregatedData[item.name] = { name: item.name, took: 0, gave: 0, open: 0 };
        }
        aggregatedData[item.name].gave += item.amount;
        aggregatedData[item.name].open -= item.amount;
      }
    });
  
    return Object.values(aggregatedData);
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const getMonthNameFromDate = (dateString) => {
    const date = new Date(dateString);
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const sortDataByDate = (data) => {
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  export const aggregateMonthlyData = (incomeData, extraExpensesData, monthlyExpensesData) => {
    // Sort the data by date
    const sortedIncomeData = sortDataByDate(incomeData);
    const sortedExtraExpensesData = sortDataByDate(extraExpensesData);
  
    const monthlyData = {};
  
    // Initialize all months
    sortedIncomeData.forEach(item => {
      const monthName = getMonthNameFromDate(item.date);
      if (!monthlyData[monthName]) {
        monthlyData[monthName] = {
          income: 0,
          expenses: 0,
          savings: 0,
          credit: 0,
          actualBalance: 0
        };
      }
    });
  
    sortedExtraExpensesData.forEach(item => {
      const monthName = getMonthNameFromDate(item.date);
      if (!monthlyData[monthName]) {
        monthlyData[monthName] = {
          income: 0,
          expenses: 0,
          savings: 0,
          credit: 0,
          actualBalance: 0
        };
      }
    });
  
    // Add monthly expenses to each month
    const totalMonthlyExpenses = monthlyExpensesData.reduce((total, item) => total + item.amount, 0);
    Object.keys(monthlyData).forEach(month => {
      monthlyData[month].expenses += totalMonthlyExpenses;
    });
  
    // Aggregate income and extra expenses
    const allData = [
      ...sortedIncomeData.map(item => ({ ...item, type: 'income' })),
      ...sortedExtraExpensesData.map(item => ({ ...item, type: 'extraExpense' })),
    ];
  
    allData.forEach(item => {
      const monthName = getMonthNameFromDate(item.date);
  
      if (item.type === 'income') {
        monthlyData[monthName].income += item.amount;
      } else if (item.type === 'extraExpense') {
        monthlyData[monthName].expenses += item.amount;
      }
  
      monthlyData[monthName].savings = monthlyData[monthName].income - monthlyData[monthName].expenses;
    });
  
    // Calculate credit and actual balance for each month
    const initialToPay = 3510;
    let previousToPay = initialToPay;
  
    Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b)).forEach((month, index) => {
      const savedValue = Math.round(monthlyData[month].savings);
      const toPay = index === 0 ? initialToPay : previousToPay - savedValue;
      const canUse = 8500 - toPay;
  
      monthlyData[month].credit = toPay;
      monthlyData[month].actualBalance = canUse;
  
      previousToPay = toPay;
    });
  
    return monthlyData;
  };
  