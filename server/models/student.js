const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    course: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    grade: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {
    Student
};