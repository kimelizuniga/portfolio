require("dotenv").config();

const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      dotenv    = require('dotenv'),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      flash = require("connect-flash"),
      User = require("./models/user"),
      Project = require("./models/projects"),
      passportLocalMongoose = require("passport-local-mongoose")
      methodOverride = require("method-override"),
      bodyParser =  require("body-parser");


dotenv.config(); 

// SETUP DATABASE
const url =  process.env.MONGOURL || "mongodb://localhost/portfolio";  

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() =>{
    console.log("Connected to Database!");
}).catch(err => {
    console.log("ERROR", err.message);
});

// REQUIRE ROUTES

const indexRoutes = require("./routes/index"),
      projectRoutes = require("./routes/projects");

// SAVE SESSION

app.use(require("express-session")({
    secret: "My name is Kim Zuniga",
    resave: false,
    saveUninitialized: false
}));

// APP CONFIG

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES CONFIG

app.use("/", indexRoutes);
app.use("/projects", projectRoutes );


// LISTEN  PORT

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
    console.log("Server started " + port);
});
