const express    = require('express');
const config     = require('./config/server');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

const app        = express();

// Map global promise - get rid of warning (remember to do this regularly)
mongoose.Promise = global.Promise;

// Connect to Mongoose
mongoose.connect(config.dbConnection, {
    useMongoClient: true
})
    .then( () =>
        console.log(config.onDbConnectionMessage + config.dbName ))
    .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome BITCH!';
    res.render('index');
    {
        title: title
    }
});

// About Route
app.get('/about', (req, res) => {
    res.render('about')
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
});

// Proceess Form
app.post('/ideas', (req, res) => {
    let errors = [];

    if(!req.body.title) {
        errors.push({text: 'Please add a title'});
    }
    if(!req.body.details) {
        errors.push({text: 'Please add some details'});
    }
    if(errors.length > 0) {
        res.render('ideas/add',{
            errors:  errors,
            title:   req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title:   req.body.title,
            details: req.body.details
        };
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
    }
});

app.listen(config.port, () => {
   console.log(config.onServerConnectionMessage + config.port);
});