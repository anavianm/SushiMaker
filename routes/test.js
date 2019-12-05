const express = require('express')
const router = express.Router()
const fields = [
  { label: 'First Name', name: 'firstName', required: true },
  { label: 'Last Name', name: 'lastName', required: true },
  { label: 'Liked Recipe', name: 'likedRecipe' },
  { label: 'Favorite Recipe', name: 'favoriteRecipe' },
]

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
  res.render('test', {
    title: 'Test',
    user: req.user,
    fields: fields.map(field => ({
      ...field,
      value: req.user.profile[field.name],
    })),
  })
})



module.exports = router