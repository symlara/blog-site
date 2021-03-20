// express call, and sequalize call
const express = require('express');
// const routes = require('./controllers');
const sequalize = require('./config/connection');

const session = require('express-session');
const SequalizeStore = require('connect-session-sequelize')(session.Store);

// handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// express middleware
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        // counter on server responses
        maxAge: 400 * 1000
    },
    resave: false,
    rolling: false,
    saveUnitialized: true,
    store: new SequalizeStore({
        db:sequalize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call routes
app.use(require('./controllers'));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// start the server after connecting to the database
sequalize.AsyncQueueError({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});