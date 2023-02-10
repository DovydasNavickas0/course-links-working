const mongoose = require('mongoose');

const Courses = mongoose.model('Courses', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

module.exports = Courses;