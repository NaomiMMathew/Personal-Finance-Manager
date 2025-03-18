import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './TransferMoney.css';

const TransferMoney = () => {
    const [transactions, setTransactions] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [date, setDate] = useState('');
    const [userId, setUserId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState({});
    const navigate = useNavigate();

    

    // Fetch user-specific transactions
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

    // Add transaction
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

    // Handle Edit
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

    return (
        <div className='container'>
            <header className="header" style={{ background: 'green' }}>
                <h1 className="logo">
                    <FaChartLine style={{ color: 'white', fontSize: '3rem' }} />
                    MYFINANCE TRACKER
                </h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to='/userhome'>MYHOME</Link></li>
                        <li><Link to="/login">LOGIN</Link></li>
                        <li><Link to='/transfermoney'>TRACK MONEY</Link></li>
                        <li><Link to='/dashboard'>DASHBOARD</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="transaction-form-container">
                <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
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
                        value={isEditing ? currentTransaction.date.split('T')[0] : date}
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
            </div>

            {/* Transactions will be mapped here */}
            <div className="dashboard-container">
                <h2>Transaction Summary</h2>
                {transactions.length > 0 ? (
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
                ) : (
                    <p>No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default TransferMoney;




//not working properly
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaChartLine } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import './TransferMoney.css';

// const TransferMoney = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [title, setTitle] = useState('');
//     const [amount, setAmount] = useState('');
//     const [category, setCategory] = useState('');
//     const [description, setDescription] = useState('');
//     const [transactionType, setTransactionType] = useState('');
//     const [date, setDate] = useState('');
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentTransaction, setCurrentTransaction] = useState({});
//     const navigate = useNavigate();

//     // Fetch userId from localStorage
//     const userId = localStorage.getItem('userId');
//     console.log('Retrieved userId from localStorage:', userId);

//     useEffect(() => {
//         if (!userId) {
//             console.warn('User ID not found in localStorage. Redirecting to login.');
//             alert('Please log in to continue.');
//             navigate('/login'); // Redirect to login
//             return;
//         }

//         // Fetch transactions for the logged-in user
//         const fetchTransactions = async () => {
//             try {
//                 console.log('Fetching transactions for userId:', userId);
//                 const response = await axios.get(`http://localhost:3001/api/transactions?userId=${userId}`);
//                 console.log('Fetched transactions:', response.data);
//                 setTransactions(response.data);
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             }
//         };

//         fetchTransactions();
//     }, [userId, navigate]);

//     // Add transaction
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create the transaction object to send to the backend
//         const newTransaction = {
//             title,
//             amount,
//             category,
//             description,
//             transactionType,
//             date,
//             userId,
//         };

//         console.log('New Transaction:', newTransaction);

//         try {
//             // Send POST request to the backend
//             const response = await axios.post('http://localhost:3001/api/transactions', newTransaction);
//             console.log('Transaction added successfully:', response.data);
//             alert('Transaction added successfully!');
//             navigate('/dashboard'); // Redirect to dashboard or other page
//         } catch (error) {
//             console.error('Error adding transaction:', error.response || error.message);
//             alert(error.response?.data?.message || 'Failed to add transaction. Please try again.');
//         }
//     };
    

//     // Handle Edit
//     const handleEdit = (index) => {
//         console.log('Editing transaction at index:', index);
//         setIsEditing(true);
//         setCurrentTransaction(transactions[index]); // Set current transaction for editing
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         console.log(`Input change detected. Field: ${name}, Value: ${value}`);
//         setCurrentTransaction((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleUpdate = async () => {
//         console.log('Updating transaction:', currentTransaction);

//         try {
//             const response = await axios.put(
//                 `http://localhost:3001/api/transactions/update/${currentTransaction._id}`,
//                 currentTransaction
//             );
//             console.log('Transaction updated successfully. Response:', response.data);
//             alert('Transaction updated successfully!');
//             setTransactions((prev) =>
//                 prev.map((transaction) =>
//                     transaction._id === currentTransaction._id ? response.data : transaction
//                 )
//             );
//             setIsEditing(false); // Close edit form
//         } catch (error) {
//             console.error('Error updating transaction. Details:', error.response || error.message);
//             alert('Failed to update transaction. Please try again.');
//         }
//     };

//     // Handle Delete
//     const handleDelete = async (index) => {
//         const transactionToDelete = transactions[index];
//         console.log('Deleting transaction:', transactionToDelete);

//         try {
//             await axios.delete(`http://localhost:3001/api/transactions/delete/${transactionToDelete._id}`);
//             console.log('Transaction deleted successfully.');
//             alert('Transaction deleted successfully!');
//             setTransactions((prev) => prev.filter((_, i) => i !== index));
//         } catch (error) {
//             console.error('Error deleting transaction. Details:', error.response || error.message);
//             alert('Failed to delete transaction. Please try again.');
//         }
//     };

//     return (
//         <div className='container'>
//             <header className="header" style={{ background: 'green' }}>
//                 <h1 className="logo">
//                     <FaChartLine style={{ color: 'white', fontSize: '3rem' }} />
//                     MYFINANCE TRACKER
//                 </h1>
//                 <nav>
//                     <ul className="nav-links">
//                         <li><Link to='/userhome'>MYHOME</Link></li>
//                         <li><Link to="/login">LOGIN</Link></li>
//                         <li><Link to='/transfermoney'>TRACK MONEY</Link></li>
//                         <li><Link to='/dashboard'>DASHBOARD</Link></li>
//                     </ul>
//                 </nav>
//             </header>

//             <div className="transaction-form-container">
//                 <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
//                 <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         name="title"
//                         value={isEditing ? currentTransaction.title : title}
//                         onChange={isEditing ? handleInputChange : (e) => setTitle(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="number"
//                         placeholder="Amount"
//                         name="amount"
//                         value={isEditing ? currentTransaction.amount : amount}
//                         onChange={isEditing ? handleInputChange : (e) => setAmount(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Category"
//                         name="category"
//                         value={isEditing ? currentTransaction.category : category}
//                         onChange={isEditing ? handleInputChange : (e) => setCategory(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         name="description"
//                         value={isEditing ? currentTransaction.description : description}
//                         onChange={isEditing ? handleInputChange : (e) => setDescription(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Transaction Type"
//                         name="transactionType"
//                         value={isEditing ? currentTransaction.transactionType : transactionType}
//                         onChange={isEditing ? handleInputChange : (e) => setTransactionType(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="date"
//                         name="date"
//                         value={isEditing ? currentTransaction.date.split('T')[0] : date}
//                         onChange={isEditing ? handleInputChange : (e) => setDate(e.target.value)}
//                         required
//                     />
//                     <button type="submit">{isEditing ? 'Update Transaction' : 'Add Transaction'}</button>
//                     {isEditing && (
//                         <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//                     )}
//                 </form>
//             </div>

//             {/* Transactions Summary */}
//             <div className="dashboard-container">
//                 <h2>Transaction Summary</h2>
//                 {transactions.length > 0 ? (
//                     <table border="1" cellPadding="10" cellSpacing="0">
//                         <thead>
//                             <tr>
//                                 <th>Title</th>
//                                 <th>Amount (₹)</th>
//                                 <th>Category</th>
//                                 <th>Transaction Type</th>
//                                 <th>Date</th>
//                                 <th>Edit or Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.map((transaction, index) => (
//                                 <tr key={index}>
//                                     <td>{transaction.title}</td>
//                                     <td>{transaction.amount}</td>
//                                     <td>{transaction.category}</td>
//                                     <td>{transaction.transactionType}</td>
//                                     <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                                     <td>
//                                         <button onClick={() => handleEdit(index)}>Edit</button>
//                                         <button onClick={() => handleDelete(index)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No transactions found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TransferMoney;
