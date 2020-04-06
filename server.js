const express = require('express');
const mongojs = require('mongojs');
const mongoose = require('mongoose');

const app = express();
const db = mongojs('contactlist', ['contactlist']);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

mongoose.connect("mongodb+srv://cluster0-l3oqr.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB conectado...");
}).catch((err) => {
    console.log("Houve um erro: " + err);
});

// Model - Characters
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

mongoose.model('character', CharSchema);

const Character = mongoose.model('character');

/*
new Ederson({
    nome: "Ederson",
    sobrenome: "Schaukoski",
    email: "eder@email.com",
    idade: 23,
    pais: "Brasil"
}).save().then(() => {
    console.log("Usuário criado com sucesso!")
}).catch((err) => {
    console.log("Houve um erro ao registrar o usuario: "+err)
})*/

app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function (req, res) {
    /*Ederson.find({}, function (err, collection) {
        res.json(collection);
    });*/
    /*
        db.contactlist.find(function (err, docs) {
            res.json(docs);
        });*/
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    return res.redirect('/');
});

app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.listen(PORT);
console.log("Server running on port 5000");