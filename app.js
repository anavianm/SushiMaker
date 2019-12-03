const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const morgan = require('morgan')
const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const okta = require('./okta')
const indexRouter = require('./routes/index')
const dashboardRouter = require('./routes/dashboard')
//const profileRouter = require('./routes/profile')
const testRouter = require('./routes/test')
const registrationRouter = require('./routes/register')
const resetPassword = require('./routes/reset-password')
const recipesRoutes = require('./routes/recipes')

mongoose.connect('mongodb+srv://mchoi06:oof@mchoi06-dvlp7.mongodb.net/Comp20Final?retryWrites=true&w=majority', 
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
);

const app = express()

const oidc = new ExpressOIDC({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(morgan('dev'));
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());	

app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false,
}))

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET');
		return res.status(200).json({});
	}
	next();
});

app.use(oidc.router)
app.use(okta.middleware)

app.use('/', indexRouter)
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
//app.use('/profile', oidc.ensureAuthenticated(), profileRouter)
app.use('/test', oidc.ensureAuthenticated(), testRouter)
app.use('/register', registrationRouter)
app.use('/reset-password', resetPassword)
app.use('/recipes', recipesRoutes);
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
}) 

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});



module.exports = { app, oidc }