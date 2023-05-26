const {
	deleteExpense,
	addExpense,
	getExpenses,
} = require("../controllers/expense");
const {
	addIncome,
	getIncomes,
	deleteIncome,
} = require("../controllers/income");

const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("Go to /api/get-incomes or /api/get-expenses");
});

router.get("/get-incomes", getIncomes);
router.post("/add-income", addIncome);
router.delete("/delete-income/:id", deleteIncome);

router.get("/get-expenses", getExpenses);
router.post("/add-expense", addExpense);
router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;
