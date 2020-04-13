const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// make a connection
mongoose.connect('mongodb+srv://dbUser:zge3TnJFfYe839Lh@cluster0-l3oqr.mongodb.net/tanime', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// get reference to database
var db = mongoose.connection;

const CharSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    rarity: {
        type: Number,
        require: true
    },
    series_id: {
        type: Number,
        require: true
    },
    origin_series_id: {
        type: Number,
        require: true
    }
});

const SeriesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
});

// compile schema to model
var Char = mongoose.model('Char', CharSchema, 'char');
var Series = mongoose.model('Series', SeriesSchema, 'series');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connection Successful!");

    // a document instance
    //var char1 = new Char({ name: 'Bob Esponja', image: 'dRefdeed', rarity: 1, series_id: 2, origin_series_id: 3 });


    //Char.find({ _id:"5e8deac05e90be209ce38291" }).remove().exec();
    // save model to database
    /*char1.save(function (err, char) {
        if (err) return console.error(err);
        console.log(char.name + " saved to char collection.");
    });*/

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));
app.use(express.static(__dirname + "/public"));

app.get('/series', function (req, res) {
    Series.find({}, function (err, collection) {
        res.json(collection);
    });
});

app.get('/api/series/create/:seriesname', function (req, res) {
    var seriesname = req.params.seriesname;
    Series.findOne({ name: seriesname }, function (err, collection) {
        res.json(collection);
    });
});

app.get('/char', function (req, res) {
    Char.find({}, function (err, collection) {
        res.json(collection);
    });
});
/*
function stringRefactory(string) {
    return string.replace(/_/g, ' ');
}
*/
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    return res.redirect('/');
});

app.post('/char/create', function (req, res) {

    console.log(req.body);

});

app.post('/series/create', function (req, res) {
    // a document instance
    var series = new Series({ name: req.body.name, image: req.body.image });

    series.save(function (err, series) {
        res.json(series);
    });
});

app.put('/series/create/:seriesname', function (req, res) {
    const filter = { name: req.params.seriesname };
    const update = { name: req.body.name, image: req.body.image };
    Series.findOneAndUpdate(filter, update, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Succesfully saved.');
    });

    console.log("atualizou");


    // a document instance
    //var series = new Series({ name: req.body.name, image: req.body.image });

    /*series.save(function (err, series) {
        res.json(series);
    });*/
});

/* remove all
Series.remove({}, function(){
    console.log("removeu");
});*/

app.listen(PORT);
console.log("Server running on port 5000 http://localhost:5000/");