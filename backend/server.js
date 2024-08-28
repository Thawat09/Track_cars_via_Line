require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('./src/config/postgre');
require('./src/middleware/passport')(passport);

const app = express();

app.use(session({
    store: new pgSession({ pool }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./src/routes'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});