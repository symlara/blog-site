const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

//express session and sequelize store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// for express middleware
const path = require('path');

// App initiation
const PORT = process.env.PORT || 3001;
const app = express();


// This code sets up an Express.js session and connects the session to our Sequelize database. 
const sess = {
  secret: 'secrets',
  cookie: {
      // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
      maxAge: 300 * 1000
  },
  resave: false,
  // resets maxAge counter on every server response.
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
      db:sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//turn on routes
app.use(routes);

// built-in Express.js middleware function that can take all of the contents of a folder 
// and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// importing the connection to Sequelize from config/connection.js.
//turn on connection to db and server
sequelize.sync({ force:false}).then(() => {
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
});
  