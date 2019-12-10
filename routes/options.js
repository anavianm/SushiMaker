const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Recipe = require('../models/recipe');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'SushiMaker',
    user: req.user,
  })
})


router.get('/', (req, res, next) => {
	var info1 = req.query.first;
	var info2 = req.query.second;
	var info3 = req.query.third;
	console.log('Ingredients are: First: ' + info1 + ', Second: ' + info2 + ', Third: ' + info3);
	if (info1 && info2 && info3) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info1, info2, info3] }})
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
		console.log('Querying 1, 2 and 3');
	}
	else if (info1 && info2) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info1, info2] }})
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
		console.log('Querying 1 and 2');
	}
	else if (info1 && info3) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info1, info3] }})
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
		console.log('Querying 1 and 3');
	}
	else if (info2 && info3) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info2, info3] }})
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
		console.log('Querying 2 and 3');
	}
	else if (info1) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info1] }})
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
		console.log('Querying 1');
	}
	else if (info2) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info2] }})
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
		console.log('Querying 2');
	}
	else if (info3) {
		Recipe.find({ "ingredients.unmeasured": {$all: [info3] }})
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
		console.log('Querying 3');
	}
});

module.exports = router;