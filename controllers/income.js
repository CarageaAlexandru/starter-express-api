const IncomeSchema = require("../models/income");

exports.addIncome = async (req, res) => {
	const { title, amount, category, description, date } = req.body;

	const income = IncomeSchema({
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
		await income.save();
		res.status(200).json({ message: "Income added." });
	} catch (error) {
		res.status(500).json({ message: "Server error, please try later." });
	}
	console.log(income);
};

exports.getIncomes = async (req, res) => {
	try {
		const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
		console.log(incomes);
		if (incomes) {
			return res.status(200).json(incomes);
		} else {
			return res
				.status(200)
				.json({ message: "No incomes entries found." });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.deleteIncome = async (req, res) => {
	try {
		const { id } = req.params;
		IncomeSchema.findByIdAndDelete(id)
			.then((income) => {
				res.status(200).json({ message: "Income Deleted." });
			})
			.catch((error) => {
				res.status(500).json({
					message: "Server error, please try later.",
				});
			});
	} catch (error) {}
};
