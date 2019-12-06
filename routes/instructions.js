const express = require('express')
const router = express.Router()
const app = express();
const fields = [
  { label: 'First Name', name: 'firstName', required: true },
  { label: 'Last Name', name: 'lastName', required: true },
  { label: 'Liked Recipe', name: 'likedRecipe' },
  { label: 'Favorite Recipe', name: 'favoriteRecipe' },
]
//const recipeRoutes = require('./routes/recipes');

/* GET home page. */

app.use((req, res, next) => {
  if (!req.userinfo) {
    return next();
  }
 
  oktaClient.getUser(req.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
});


router.get('/', function (req, res, next) {
  res.render('instructions', {
    title: 'SushiMaker',
    user: req.user,
  })
})


router.post('/', async (req, res, next) => {
  try {
    Object.assign(req.user.profile, req.body)

    await req.user.update()
  } catch (error) {
    console.log(error)
  }

  next()
})


router.use('/', (req, res, next) => {
  res.render('instructions', {
    title: 'SushiMaker',
    user: req.user,
    fields: fields.map(field => ({
      ...field,
      value: req.user.profile[field.name],
    })),
  })
})


module.exports = router







