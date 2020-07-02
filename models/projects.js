const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: String,
    image:String,
    link: String,
    description: String,
    created_at: { type: Date, required: true, default: Date.now}
}); 

module.exports = mongoose.model("Project", projectSchema);