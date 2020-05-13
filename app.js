const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      bodyParser =  require("body-parser");


mongoose.connect("mongodb://localhost/portfolio", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


const projectSchema = new mongoose.Schema({
    title: String,
    image:String,
    link: String,
    description: String
}); 

const Project = mongoose.model("Project", projectSchema);
// Project.create(
//     {
//     title: "Project Title",
//     image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     link: "www.google.ca",
//     description: "Filler description"
//     }, (err, project) => {
//         console.log(project);
// })
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
    Project.find({}, (err, allProjects) => {
        if(err){
            console.log(err);
        } else {
            res.render("projects", {projects: allProjects});
        }
    })
});

// NEW ROUTE

app.get("/projects/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE

app.post("/projects", (req, res) => {
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

app.get("/projects/:id", (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if(err){
            console.log(err);
        } else {
            res.render("show", {project: foundProject});
        }
    })
});


let port = process.env.PORT;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
