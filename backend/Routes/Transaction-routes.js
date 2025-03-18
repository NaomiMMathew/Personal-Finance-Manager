const express = require('express');
const router = express.Router();
const { addTransaction,getTransaction,updateTransaction, deleteTransaction, 
        getExpenseTransactions, getIncomeTransactions, getTotalTransactions,
        getTotalIncome,
        getTotalExpense,
        getPersonTransactions} = require('../controllers/Transaction-controller'); // Ensure the path is correct

router.post('/transactions', addTransaction);
router.get('/transactions',getTransaction)
router.put('/transactions/update/:id',updateTransaction)
router.delete('/transactions/delete/:id',deleteTransaction)
router.get('/transactions/expense',getExpenseTransactions)
router.get('/transactions/income',getIncomeTransactions)
router.get('/transactions/total',getTotalTransactions)
router.get('/transactions/incometotal',getTotalIncome)
router.get('/transactions/expensetotal',getTotalExpense)
router.get('/transactions/:userId',getPersonTransactions)
module.exports = router;
