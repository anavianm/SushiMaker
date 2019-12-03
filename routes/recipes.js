const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//const Recipe = require('./models/recipe');

router.get('/', (req, res, next) => {
	Recipe.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
});

//router.post('/', (req, res, next) => {
//	const recipe = new Recipe({
//		_id: new mongoose.Types.ObjectId(),
//		recipe: req.body.recipe,
//		type: req.body.type,
//		servings: req.body.servings,
//		calories: req.body.calories,
//		time: req.body.time,
//		ingredients: req.body.ingredients,
//		instructions: req.body.instructions
//	});
//	recipe
//		.save()
//		.then(result => {
//			console.log(result);
//			res.status(201).json({
//				message: 'Handling POST requests to /recipes',
//				createdRecipe:recipe				
//			});
//	})
//	.catch(err => {
//		console.log(err);
//		res.status(201).json({
//			error: err
//		});
//	});
//});

router.get('/:recipeId', (req, res, next) => {
	const id = req.params.recipeId;
	Recipe.findById(id)
	.exec()
	.then(doc => {
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

// router.patch('/', (req, res, next) => {
// 	res.status(200).json({
// 		message: 'Updated product!'
// 	});
// });

// router.delete('/', (req, res, next) => {
// 	res.status(200).json({
// 		message: 'Deleted product!'
// 	});
// });

module.exports = router;