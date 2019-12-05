const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	recipe: String,
	type: String,
	servings: String,
	calories: String,
	time: Object,
	ingredients: Object,
	instructions: Array
});

module.exports = mongoose.model('Recipe', recipeSchema);