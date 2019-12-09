const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('homepage', {
    title: 'SushiMaker',
    user: req.user,
  })
})

module.exports = router