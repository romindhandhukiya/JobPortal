const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, "Title is Required"],
        maxlength: 70
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description is Required"],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, "Salary is Required"],
    },
    location:{
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    JobType: {
        type: ObjectId,
        ref: 'JobType',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Job', jobSchema);