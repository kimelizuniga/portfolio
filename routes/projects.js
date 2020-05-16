const express = require("express"),
      router  = express.Router(),
      Project = require("../models/projects");

router.get("/", (req, res) => {
    Project.find({}, (err, allProjects) => {
        if(err){
            console.log(err);
        } else {
            res.render("projects", {projects: allProjects});
        }
    })
});

// NEW ROUTE

router.get("/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE

router.post("/", (req, res) => {
    const title = req.body.title,
        image = req.body.image,
        description = req.body.description,
        link = req.body.link,
        newProject = {title: title, image: image, link: link, description: description};
    
    Project.create(newProject, (err, newCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("projects");
        }
    })
});

// SHOW ROUTE

router.get("/:id", (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if(err){
            console.log(err);
        } else {
            res.render("show", {project: foundProject});
        }
    })
});

module.exports = router;