const express = require('express');
const config = require('./config/server');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to Mongoose
mongoose.connect(config.dbConnection, {
    useMongoClient: true
})
    .then( () =>
        console.log(config.onDbConnectionMessage + config.dbConnection ))
    .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index');
    title: title
});

// About Route
app.get('/about', (req, res) => {
    res.render('about')
});

app.listen(config.port, () => {
   console.log(config.onServerConnectionMessage + config.port);
});