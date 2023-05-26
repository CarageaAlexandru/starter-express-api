const ExpenseSchema = require("../models/expense");

exports.addExpense = async (req, res) => {
	const { title, amount, category, description, date } = req.body;

	const expense = ExpenseSchema({
		title,
		amount,
		category,
		description,
		date,
	});
	try {
		// validate inputs
		if (!title || !category || !description || !date) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}
		if (amount <= 0 || !amount === "number") {
			return res.status(400).json({ message: "Amount must be a number" });
		}
		await expense.save();
		res.status(200).json({ message: "Expense added." });
	} catch (error) {
		res.status(500).json({ message: "Server error, please try later." });
	}
	console.log(expense);
};

exports.getExpenses = async (req, res) => {
	try {
		const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
		console.log(expenses);
		if (expenses) {
			return res.status(200).json(expenses);
		} else {
			return res
				.status(200)
				.json({ message: "No expenses entries found." });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.deleteExpense = async (req, res) => {
	try {
		const { id } = req.params;
		ExpenseSchema.findByIdAndDelete(id)
			.then((expense) => {
				res.status(200).json({ message: "Expense Deleted." });
			})
			.catch((error) => {
				res.status(500).json({
					message: "Server error, please try later.",
					error,
				});
			});
	} catch (error) {
		console.log(error);
	}
};
