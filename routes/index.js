const express = require("express"),
      router  = express.Router(),
      passport  = require("passport"),
      User  = require("../models/user");

// HOME ROUTE 

router.get("/", (req, res) => {
    res.render("index");
});

// ABOUT ROUTE

router.get("/about", (req, res) => {
    res.render("about");
});

// CONTACT ROUTE

router.get("/contact", (req, res) => {
    res.render("contact");
});

// SIGN UP ROUTE

router.get("/register", (req, res) => {
    res.render("register")
})

// HANDLE SIGN UP ROUTE

router.post("/register", (req, res) => {
    req.body.username
    req.body.password
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", "Only one user allowed")
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Successfully registered");
            res.redirect("/projects");
        })
    })
})

// SHOW LOGIN FORM

router.get("/login", (req, res) => {
    res.render("login");
})

// LOGIN LOGIC ROUTE 

router.post("/login", passport.authenticate("local",
    {   
        failureRedirect: "/login",
        failureFlash: true
        }), (req, res) => {
            req.flash("success", "Welcome Kim Z.");
            res.redirect("/projects")
            });

router.get("/logout", (req, res) => {
    req.flash("success", "Successfully logged out")
    req.logout();
    res.redirect("/projects");
})

module.exports = router;