const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded{extended: false})


app.post('/user_choice', (req, res) => {
	console.log("Trying to grab user's choices")
	res.end()
	console.log("How do we get the form data")

	console.log("First Ingredient: " + req.body.first)
	const first_ingredient = req.body.first

	const queryString = "INSERT INTO users (first,second, third) VALUES (?, ?, ?)"
	getConnection().query(queryString, [first, second, third], (err, results, fields) =>{
		if (err) {
			console.log("Failed to grab ingredients" + err)
			res.sendStatus(500)
			return
		}
		console.log("Found Ingredients:", results)
	})
})