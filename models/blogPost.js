const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogPostSchema = new Schema({
    title:  {
        type: String,
        required: true,
    },
    author:  { 
        type: String,
        required: true,
        unique: true
    },
    description:  {
        type: String,
        required: true
    },
    body:  {
        type: String,
        required: true
    },

    readingCount : {
        type: Number
    },

    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
})

const blogPost = mongoose.model('blogPost',blogPostSchema);
module.exports = blogPost