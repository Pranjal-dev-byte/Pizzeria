var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var session = require('express-session');
let cors = require("cors");
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const passport = require('passport');
const passportJWT = require('passport-jwt');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'PS: A random string';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

let googleStrategy = new GoogleStrategy({
    clientID: "508931036772-agflq43lkua9lhjp8571lovoo884743o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/googleRedirect"
  },
  function(accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
)

// use the strategy
passport.use(strategy);

passport.use(googleStrategy)

var app = express();

app.use(cors());

// parse application/json
app.use(session({ resave: true, saveUninitialized: true, 
  secret: 'uwotm8' }));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (needed for auth)

// parse application/json
app.use(bodyParser.json());                        

// app.use(bodyParser()); // get information from html forms
// required for passport

// initialize passport with express
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const Sequelize = require('sequelize');

// initialze an instance of Sequelize
const sequelize = new Sequelize({
  host: 'localhost',
  database: 'pizzeriadb',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// create user model
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  
});

// create table with user model
User.sync()
  .then(() => console.log('User table synced successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

// create some helper functions to work on the database
const createUser = async ({ username, password, email }) => {
  return await User.create({ username, password, email });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};

// create user model
const Pizzas = sequelize.define('pizzas', {
  description: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  ingredients: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  topping: {
    type: Sequelize.STRING,
  }},{

    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // If don't want createdAt
    createdAt: false,
  
    // If don't want updatedAt
    updatedAt: false,
  
    // your other configuration here
  
  });

// create table with user model
Pizzas.sync()
  .then(() => console.log('Pizzas table synced successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

// create some helper functions to work on the database
// const createUser = async ({ username, password, email }) => {
//   return await User.create({ username, password, email });
// };

const getAllPizzas = async () => {
  return await Pizzas.findAll();
};

// create user model
const Ingredients = sequelize.define('ingredients', {
  image: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  tname: {
    type: Sequelize.STRING,
  }},{

    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // If don't want createdAt
    createdAt: false,
  
    // If don't want updatedAt
    updatedAt: false,
  
    // your other configuration here
  
  }
); 

// create table with user model
Ingredients.sync()
  .then(() => console.log('User table synced successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));


// create some helper functions to work on the database
// const createUser = async ({ username, password, email }) => {
//   return await User.create({ username, password, email });
// };

const getAllIngredients = async () => {
  return await Ingredients.findAll();
};

// create user model
const Cart = sequelize.define('cart', {
  email: {
    type: Sequelize.STRING,
  },
  contents: {
    type: Sequelize.STRING,
  }},{

    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // If don't want createdAt
    createdAt: false,
  
    // If don't want updatedAt
    updatedAt: false,
  
    // your other configuration here
  
  }
); 

// create table with user model
Ingredients.sync()
  .then(() => console.log('User table synced successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));


// create some helper functions to work on the database
// const createUser = async ({ username, password, email }) => {
//   return await User.create({ username, password, email });
// };
const createCartEntry = async ({ email, contents }) => {
  return await User.create({ email, contents });
};
// const getUser = async obj => {
//   return await User.findOne({
//     where: obj,
//   });
// };

// set some basic routes
app.get('/', function(req, res) {
  res.json({ message: 'Express is up!' });
});

// get all users
app.get('/users', function(req, res) {
  getAllUsers().then(user => res.json(user));
});

// get all ingredients
app.get('/ingredients', function(req, res) {
  getAllIngredients().then(user => res.json(user));
});

// get all pizzas
app.get('/pizzas', function(req, res) {
  getAllPizzas().then(user => res.json(user));
});

// register route
app.post('/register', function(req, res, next) {
  const { username,email, password } = req.body;
  createUser({ username,email, password }).then((user) =>{
    console.log(user)
    res.json({ user, msg: 'account created successfully' })
  }
  );
});

//login route
app.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    let user = await getUser({ email: email });
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ email: email, token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  } 
});

app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))

// Oauth user data comes to these redirectURLs
app.get('/googleRedirect', passport.authenticate('google',{
  failureRedirect:'http://localhost:4200'
}),(req, res)=>{
  console.log('redirected', req.user)
  let user = {
      displayName: req.user.displayName,
      name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider }
  let payload = { id: user.id };
  let token = jwt.sign(payload, jwtOptions.secretOrKey);
  var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: user,
        token:token
    }));
    res.status(200).send(responseHTML);
  // res.json({email:user.email})
})

app.post('/createCartEntry', function(req, res, next) {
  const { email, contents } = req.body;
  createCartEntry({ email,contents }).then((res) =>{
    console.log(user)
    res.json({ user, msg: 'account created successfully' })
  }
  );
});

// protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json('Success! You can now see this without a token.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
