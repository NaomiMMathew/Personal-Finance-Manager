import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [transactions1, setTransactions1] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0); // Fixed naming
  const [showExpenses, setShowExpenses] = useState(false); // Toggle for expenses
  const [showIncome, setShowIncome] = useState(false); // Toggle for income
  const [showAddTransaction, setAddTransaction] = useState(false);
  const [showViewTransaction, setViewTransaction] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);

const fetchUserTransactions = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/transactions/${userId}`);
            setTransactions(response.data); // Update transactions for the specific user
            localStorage.setItem('transactions', JSON.stringify(response.data)); // Store transactions in local storage
        } catch (error) {
            console.error('Error fetching user transactions:', error);
            alert('Failed to fetch user transactions. Please try again.');
        }
    };

    // Load transactions from local storage or fetch from backend
    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions)); // Load transactions from local storage
        } else if (userId) {
            fetchUserTransactions(userId); // Fetch from backend if not in local storage
        }
    }, [userId]);



  const handleSubmit = async (e) => {
          e.preventDefault();
          const newTransaction = { title, amount, category, description, transactionType, date, userId };
  
          try {
              const response = await axios.post('http://localhost:3001/api/transactions', newTransaction);
              const updatedTransactions = [...transactions, response.data];
              setTransactions(updatedTransactions); // Update state with new transaction
              localStorage.setItem('transactions', JSON.stringify(updatedTransactions)); // Update local storage
              alert('Transaction added successfully!');
              navigate('/dashboard', { state: { transactions: updatedTransactions } });
          } catch (error) {
              console.error('Error adding transaction:', error);
              alert('Failed to add transaction. Please try again.');
          }
      };
    const handleEdit = (index) => {
          setIsEditing(true);
          setCurrentTransaction(transactions[index]); // Set current transaction for editing
      };
  
      const handleInputChange = (e) => {
          const { name, value } = e.target;
          setCurrentTransaction((prev) => ({
              ...prev,
              [name]: value,
          }));
      };
  
      const handleUpdate = async () => {
          try {
              const response = await axios.put(
                  `http://localhost:3001/api/transactions/update/${currentTransaction._id}`,
                  currentTransaction
              );
              const updatedTransactions = transactions.map((transaction) =>
                  transaction._id === currentTransaction._id ? response.data : transaction
              );
              setTransactions(updatedTransactions); // Update state
              localStorage.setItem('transactions', JSON.stringify(updatedTransactions)); // Update local storage
              alert('Transaction updated successfully!');
              setIsEditing(false); // Close edit form
          } catch (error) {
              console.error('Error updating transaction:', error);
              alert('Failed to update transaction. Please try again.');
          }
      };
  
      // Handle Delete
      const handleDelete = async (index) => {
          const transactionToDelete = transactions[index];
          try {
              await axios.delete(`http://localhost:3001/api/transactions/delete/${transactionToDelete._id}`);
              const updatedTransactions = transactions.filter((_, i) => i !== index);
              setTransactions(updatedTransactions); // Update state
              localStorage.setItem('transactions', JSON.stringify(updatedTransactions)); // Update local storage
              alert('Transaction deleted successfully!');
          } catch (error) {
              console.error('Error deleting transaction:', error);
              alert('Failed to delete transaction. Please try again.');
          }
      };
  






  // Fetch expense transactions
  const fetchExpenseTransactions = async () => {
    try {
      setError(null); // Reset the error state
      const response = await fetch("http://localhost:3001/api/transactions/expense");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions1(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch income transactions
  const fetchIncomeTransactions = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:3001/api/transactions/income");
      if (!response.ok) {
        throw new Error("Failed to fetch income transactions");
      }
      const data = await response.json();
      setIncomeTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch total income
  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/transactions/incometotal");
        const data = await response.json();
        setTotalIncome(data.totalIncome);
      } catch (error) {
        setError("Error fetching total income");
      }
    };

    fetchTotalIncome();
  }, []);

  // Fetch total expense
  useEffect(() => {
    const fetchTotalExpense = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/transactions/expensetotal");
        const data = await response.json();
        setTotalExpense(data.totalExpense);
      } catch (error) {
        setError("Error fetching total expense");
      }
    };

    fetchTotalExpense();
  }, []);

  const toggleExpenseChart = () => {
    setShowExpenses(!showExpenses); // Toggle visibility
    if (!showExpenses) fetchExpenseTransactions(); // Fetch data only when showing
  };

  // Toggle Income Chart
  const toggleIncomeChart = () => {
    setShowIncome(!showIncome); // Toggle visibility
    if (!showIncome) fetchIncomeTransactions(); // Fetch data only when showing
  };

  // Toggle Add Transaction
  const toggleAddTransaction = () => {
    setAddTransaction(!showAddTransaction); // Toggle visibility
  };

  //Toggle view transactions
  const toggleViewTransaction = () => {
    setViewTransaction(!showViewTransaction); // Toggle visibility
  };



  // Logout navigate
  const handleButtonClick = () => {
    navigate("/login"); // Replace with your target page route
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 style={{ color: "white" }}>Dashboard</h2>
        <ul>
          <li>
            <button onClick={toggleExpenseChart} className="button">
              {showExpenses ? "Hide Expenses" : "Show Expenses"}
            </button>
          </li>
          <li>
            <button onClick={toggleIncomeChart} className="button">
              {showIncome ? "Hide Income" : "Show Income"}
            </button>
          </li>
          <li>
            <button onClick={toggleAddTransaction} className="button">
              {showAddTransaction ? "Hide Add Transaction" : "Show Add Transaction"}
            </button>
          </li>
          <li>
            <button onClick={toggleViewTransaction} className="button">
              {showViewTransaction ? "Hide View Transaction" : "Show View Transaction"}
            </button>
          </li>

        </ul>
        <div className="logout-container">
          <button className="button logout-button" onClick={handleButtonClick} >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content1">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Total Income & Expense Cards */}
        <div className="cards-container">
          <div className="card1">
            <h3>Total Expense</h3>
            <p style={{ color: "black" }}>₹{totalExpense}</p>
          </div>
          <div className="card2">
            <h3>Total Income</h3>
            <p style={{ color: "black" }}>₹{totalIncome}</p>
          </div>
        </div>

        {/* Expense Chart */}
        {showExpenses && (
          <div className="card">
            <h3>Expenses</h3>
            <ResponsiveContainer width="80%" height={250}>
              <BarChart data={transactions1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income Chart */}
        {showIncome && (
          <div className="card">
            <h3>Income</h3>
            <ResponsiveContainer width="80%" height={250}>
              <BarChart data={incomeTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#82ca9d" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}


{/* Transaction Form */}
<div className="transaction-form-container">
        
        {showAddTransaction && (
          <>
            <h2>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>
            <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={isEditing ? currentTransaction.title : title}
                onChange={isEditing ? handleInputChange : (e) => setTitle(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={isEditing ? currentTransaction.amount : amount}
                onChange={isEditing ? handleInputChange : (e) => setAmount(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={isEditing ? currentTransaction.category : category}
                onChange={isEditing ? handleInputChange : (e) => setCategory(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={isEditing ? currentTransaction.description : description}
                onChange={isEditing ? handleInputChange : (e) => setDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Transaction Type"
                name="transactionType"
                value={isEditing ? currentTransaction.transactionType : transactionType}
                onChange={isEditing ? handleInputChange : (e) => setTransactionType(e.target.value)}
                required
              />
              <input
                type="date"
                name="date"
                value={isEditing ? currentTransaction.date.split("T")[0] : date}
                onChange={isEditing ? handleInputChange : (e) => setDate(e.target.value)}
                required
              />
              {!isEditing && (
                <input
                  type="text"
                  placeholder="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                    />
                )}
                <button type="submit">{isEditing ? 'Update Transaction' : 'Add Transaction'}</button>
                {isEditing && (
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                )}
            </form>
        </>
    )}
</div>
{/* Transactions will be mapped here */}
{showViewTransaction && transactions.length > 0 && (
  <div className="dashboard-container">
    <h2>Transaction Summary</h2>
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount (₹)</th>
          <th>Category</th>
          <th>Transaction Type</th>
          <th>Date</th>
          <th>Edit or Delete</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.title}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.transactionType}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
      </div>

       </div>
  );
};

export default Dashboard;
