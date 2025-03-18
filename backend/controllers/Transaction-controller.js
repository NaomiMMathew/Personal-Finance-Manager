const Transaction = require('../models/Transaction-model'); // Ensure the path is correct
const Register=require('../models/Register-model') // If you have a user model

const addTransaction = async (req, res) => {
    const { title, amount, category, description, transactionType, date, userId } = req.body;

    try {
        // Check if user exists
        const user = await Register.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new transaction
        const newTransaction = new Transaction({
            title,
            amount,
            category,
            description,
            transactionType,
            date,
             user: userId,
        });

        // Save the transaction to the database
        const savedTransaction = await newTransaction.save();

        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


//get transaction
const getTransaction= async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// //update transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params; // Get the transaction ID from request parameters
        const {title,amount,category,description,
            transactionType,
            date,} = req.body; // Get the data to update from the request body

        // Find the transaction by ID and update it
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            {title,amount,category,description,
                transactionType,
                date,},
            { new: true } // Return the updated document
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(updatedTransaction); // Send the updated transaction as a response
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// //delete transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params; // Get the transaction ID from the request parameters

        // Find and delete the transaction by ID
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully', deletedTransaction });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// //get expense transactions
const getExpenseTransactions = async (req, res) => {
    try {
        // Filter transactions where the type/category is 'expense'
        const expenseTransactions = await Transaction.find({transactionType: "Expense" });
        res.json(expenseTransactions);
    } catch (error) {
        console.error('Error fetching expense transactions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// //get income transaction
const getIncomeTransactions = async (req, res) => {
    try {
        // Filter transactions where the type/category is 'expense'
        const incomeTransactions = await Transaction.find({transactionType: "Income" });
        res.json(incomeTransactions);
    } catch (error) {
        console.error('Error fetching expense transactions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// //get total transactions
const getTotalTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const total = transactions.reduce((acc, t) => acc + t.amount, 0);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total transactions", error });
    }
};

// //get total income transactions
const getTotalIncome = async (req, res) => {
    try {
        const incomeTransactions = await Transaction.find({ transactionType: "Income" });
        const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
        res.json({ totalIncome });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total income", error });
    }
};





// //get total expense transactions
const getTotalExpense = async (req, res) => {
    try {
        const expenseTransactions = await Transaction.find({ transactionType: "Expense" });
        const totalExpense = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
        res.json({ totalExpense });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total income", error });
    }
};

// //get a person transaction
const getPersonTransactions= async (req, res) => {
    const { userId } = req.params;
    try {
        const userTransactions = await Transaction.find({ user: userId});
        res.json(userTransactions);
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        res.status(500).send('Internal Server Error');
    }
};







//add userid feild
// Fetch all transactions (optionally filter by userId)
// const getTransaction = async (req, res) => {
//     try {
//         const { userId } = req.query; // Optional: Get userId from query parameters
//         const query = userId ? { user: userId } : {}; // Filter by userId if provided
//         const transactions = await Transaction.find(query);
//         res.json(transactions);
//     } catch (error) {
//         console.error('Error fetching transactions:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Update a transaction
// const updateTransaction = async (req, res) => {
//     try {
//         const { id } = req.params; // Transaction ID from request parameters
//         const { userId, title, amount, category, description, transactionType, date } = req.body; // Include userId in request body

//         // Find and update the transaction by ID
//         const updatedTransaction = await Transaction.findByIdAndUpdate(
//             id,
//             { user: userId, title, amount, category, description, transactionType, date },
//             { new: true } // Return the updated document
//         );

//         if (!updatedTransaction) {
//             return res.status(404).json({ message: 'Transaction not found' });
//         }

//         res.json(updatedTransaction); // Send the updated transaction as a response
//     } catch (error) {
//         console.error('Error updating transaction:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Delete a transaction
// const deleteTransaction = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Find and delete the transaction by ID
//         const deletedTransaction = await Transaction.findByIdAndDelete(id);

//         if (!deletedTransaction) {
//             return res.status(404).json({ message: 'Transaction not found' });
//         }

//         res.json({ message: 'Transaction deleted successfully', deletedTransaction });
//     } catch (error) {
//         console.error('Error deleting transaction:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Fetch expense transactions for a specific user
// const getExpenseTransactions = async (req, res) => {
//     try {
//         const { userId } = req.query; // Optional: Get userId from query parameters
//         const query = { transactionType: 'Expense', ...(userId && { user: userId }) }; // Include userId filter if provided
//         const expenseTransactions = await Transaction.find(query);
//         res.json(expenseTransactions);
//     } catch (error) {
//         console.error('Error fetching expense transactions:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Fetch income transactions for a specific user
// const getIncomeTransactions = async (req, res) => {
//     try {
//         const { userId } = req.query; // Optional: Get userId from query parameters
//         const query = { transactionType: 'Income', ...(userId && { user: userId }) }; // Include userId filter if provided
//         const incomeTransactions = await Transaction.find(query);
//         res.json(incomeTransactions);
//     } catch (error) {
//         console.error('Error fetching income transactions:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Fetch total transactions amount for a specific user
// const getTotalTransactions = async (req, res) => {
//     try {
//         const { userId } = req.query; // Optional: Get userId from query parameters
//         const query = userId ? { user: userId } : {}; // Filter by userId if provided
//         const transactions = await Transaction.find(query);
//         const total = transactions.reduce((acc, t) => acc + t.amount, 0);
//         res.json({ total });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching total transactions', error });
//     }
// };

// // Fetch total income for a specific user
// const getTotalIncome = async (req, res) => {
//     try {
//         const { userId } = req.query; // Optional: Get userId from query parameters
//         const query = { transactionType: 'Income', ...(userId && { user: userId }) }; // Include userId filter if provided
//         const incomeTransactions = await Transaction.find(query);
//         const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
//         res.json({ totalIncome });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching total income', error });
//     }
// };

// // Fetch total expense for a specific user
// const getTotalExpense = async (req, res) => {
//     try {
//         const { userId } = req.query; // Optional: Get userId from query parameters
//         const query = { transactionType: 'Expense', ...(userId && { user: userId }) }; // Include userId filter if provided
//         const expenseTransactions = await Transaction.find(query);
//         const totalExpense = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
//         res.json({ totalExpense });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching total expense', error });
//     }
// };

// // Fetch transactions for a specific user by userId
// const getPersonTransactions = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const userTransactions = await Transaction.find({ user: userId });
//         res.json(userTransactions);
//     } catch (error) {
//         console.error('Error fetching user transactions:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };





module.exports = { addTransaction ,getTransaction,updateTransaction,deleteTransaction,
                   getExpenseTransactions,getIncomeTransactions,getTotalTransactions,
                   getTotalIncome,getTotalExpense,getPersonTransactions};
