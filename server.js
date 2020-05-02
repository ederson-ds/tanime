const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var path = require("path");
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "ssshhhhh",
    resave: true,
    saveUninitialized: true,
  })
);

// make a connection
mongoose.connect(
  "mongodb+srv://dbUser:zge3TnJFfYe839Lh@cluster0-l3oqr.mongodb.net/tanime", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

// get reference to database
var db = mongoose.connection;

const CharSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  rarity: {
    type: Number,
    require: true,
  },
  series_id: {
    type: Number,
    require: true,
  },
  origin_series_id: {
    type: Number,
    require: true,
  },
});

const PreCharSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  rarity: {
    type: Number,
    require: true,
  },
  series_id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

const SeriesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const PreSeriesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  priority: {
    type: Number,
    require: true,
  },
});

// compile schema to model
var Char = mongoose.model("Char", CharSchema, "char");
var PreChar = mongoose.model("PreChar", PreCharSchema, "prechar");
var Series = mongoose.model("Series", SeriesSchema, "series");
var Preseries = mongoose.model("Preseries", PreSeriesSchema, "preseries");
var Users = mongoose.model("Users", UsersSchema, "users");

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
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

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);
app.use(express.static(__dirname + "/public"));

app.get("/series", function (req, res) {
  Series.find({}, function (err, collection) {
    res.json(collection);
  });
});

var sess;
app.get("/api/series/create/:seriesname", function (req, res) {
  sess = req.session;

  if (!sess.email) {
    //console.log("redirect");
    //res.redirect('/');
    //return;
  }
  var seriesname = req.params.seriesname;
  Series.findOne({
    name: seriesname
  }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/series/approve/:_id", function (req, res) {
  sess = req.session;

  //Admin
  if (sess.priority == 0) {
    var _id = req.params._id;
    Preseries.findOne({
      _id: _id
    }, function (err, collection) {
      Preseries.deleteOne({
        _id: _id
      }, function (err) {
        if (err) return handleError(err);
      });
      var series = new Series({
        name: collection.name,
        image: collection.image,
      });
      series.save(function (err, series) {
        res.json(series);
      });
    });
  } else {
    res.json({
      err: "You don't have permission!"
    });
  }
});

app.get("/api/series/delete/:_id", function (req, res) {
  sess = req.session;

  //Admin
  if (sess.priority == 0) {
    var _id = req.params._id;

    Preseries.deleteOne({
      _id: _id
    }, function (err) {
      if (err) return handleError(err);
    });

    Preseries.find({}, function (err, collection) {
      res.json(collection);
    });

  } else {
    res.json({
      err: "You don't have permission!"
    });
  }
});

app.get("/api/preseries/create/:seriesname", function (req, res) {
  var seriesname = req.params.seriesname;
  Preseries.findOne({
    name: seriesname
  }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/api/prechar/create/:charname", function (req, res) {
  var charname = req.params.charname;
  PreChar.findOne({
    name: charname
  }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/sessionValidate", function (req, res) {
  sess = req.session;

  if (sess.username) {
    res.json({
      username: sess.username,
      priority: sess.priority
    });
  } else {
    res.json({});
  }
});

app.get("/char", function (req, res) {
  Char.find({}, function (err, collection) {
    res.json(collection);
  });
});

app.post("/login/usernameexists", function (req, res) {
  Users.findOne({
    username: req.body.username
  }, function (err, collection) {
    res.json(collection);
  });
});

app.post("/login/exists", function (req, res) {
  sess = req.session;
  Users.findOne({
      username: req.body.username,
      password: req.body.password
    },
    function (err, collection) {
      if (collection) {
        sess.username = collection.username;
        sess.priority = collection.priority;
        res.json(collection);
      } else {
        res.json({});
      }
    }
  );
});

app.post("/signup", function (req, res) {
  sess = req.session;
  sess.username = req.body.username;
  // a document instance
  var users = new Users({
    username: req.body.username,
    password: req.body.password,
    priority: 1,
  });

  users.save(function (err, users) {
    res.json(users);
  });
});

app.post("/char/create", function (req, res) {
  sess = req.session;
  var prechar = new PreChar({
    name: req.body.name,
    image: req.body.image,
    rarity: req.body.rarity,
    series_id: req.body.series_id,
    origin_series_id: req.body.origin_series_id,
    username: sess.username,
  });

  prechar.save(function (err, prechar) {
    res.json(prechar);
  });
});

app.post("/prechar/create", function (req, res) {
  sess = req.session;
  var prechar = new PreChar({
    name: req.body.name,
    image: req.body.image,
    username: sess.username,
  });

  prechar.save(function (err, prechar) {
    res.json(prechar);
  });
});

app.post("/series/create", function (req, res) {
  sess = req.session;
  // a document instance
  /*var series = new Series({ name: req.body.name, image: req.body.image });

    series.save(function (err, series) {
        res.json(series);
    });*/
  var preseries = new Preseries({
    name: req.body.name,
    image: req.body.image,
    username: sess.username,
  });

  preseries.save(function (err, preseries) {
    res.json(preseries);
  });
});

app.get("/admin/preseries", function (req, res) {
  Preseries.find({}, function (err, collection) {
    res.json(collection);
  });
});

app.get("/preseries", function (req, res) {
  sess = req.session;
  Preseries.find({
    username: sess.username
  }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/admin/prechars", function (req, res) {
  PreChar.find({}, function (err, collection) {
    res.json(collection);
  });
});

app.get("/prechars", function (req, res) {
  sess = req.session;
  PreChar.find({
    username: sess.username
  }, function (err, collection) {
    res.json(collection);
  });
});

app.get("/api/logout", function (req, res) {
  req.session.destroy();
  res.json({
    logout: "Logout!"
  });
});

app.put("/api/prechar/create/:charname", function (req, res) {
  const filter = {
    name: req.params.charname
  };
  const update = {
    name: req.body.name,
    image: req.body.image,
    rarity: req.body.rarity,
    series_id: req.body.series_id,
  };
  PreChar.findOneAndUpdate(filter, update, {
    upsert: true
  }, function (
    err,
    doc
  ) {
    if (err) return res.send(500, {
      error: err
    });
    return res.send("Succesfully saved.");
  });
});

app.put("/api/preseries/create/:seriesname", function (req, res) {
  const filter = {
    name: req.params.seriesname
  };
  const update = {
    name: req.body.name,
    image: req.body.image
  };
  Preseries.findOneAndUpdate(filter, update, {
    upsert: true
  }, function (
    err,
    doc
  ) {
    if (err) return res.send(500, {
      error: err
    });
    return res.send("Succesfully saved.");
  });
});

app.put("/series/create/:seriesname", function (req, res) {
  const filter = {
    name: req.params.seriesname
  };
  const update = {
    name: req.body.name,
    image: req.body.image
  };
  Series.findOneAndUpdate(filter, update, {
    upsert: true
  }, function (
    err,
    doc
  ) {
    if (err) return res.send(500, {
      error: err
    });
    return res.send("Succesfully saved.");
  });

  console.log("atualizou");

  // a document instance
  //var series = new Series({ name: req.body.name, image: req.body.image });

  /*series.save(function (err, series) {
        res.json(series);
    });*/
});

//The 404 Route (ALWAYS Keep this as the last route)
/*app.get('*', function (req, res) {
    return res.redirect('/');
});*/

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

/* remove all
Series.remove({}, function(){
    console.log("removeu");
});*/

app.listen(PORT);
console.log("Server running on port 3000 http://localhost:3000/");