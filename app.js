const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      bodyParser =  require("body-parser");


mongoose.connect("mongodb://localhost/portfolio", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


//=============
// ROUTES
//=============

// HOME ROUTE 

app.get("/", (req, res) => {
    res.render("index");
});

// RESUME ROUTE

app.get("/resume", (req, res) => {
    res.render("resume");
});

// ABOUT ROUTE

app.get("/about", (req, res) => {
    res.render("about");
});

// CONTACT ROUTE

app.get("/contact", (req, res) => {
    res.render("contact");
});

// PROJECTS ROUTE

app.get("/projects", (req, res) => {
    res.render("projects")
});

// SHOW ROUTE

app.get("/projects/:id", (req, res) => {
    res.render("show");
});



app.listen(3000, () => {
    console.log("Portfolio server '3000' initialized...");
});
