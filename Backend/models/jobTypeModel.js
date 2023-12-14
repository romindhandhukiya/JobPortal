const mongoose = require('mongoose');

const jobTypeSchema = new mongoose.Schema({

    jobTypeName: {
        type: String,
        trim: true,
        required: [true, "Job Category is Required"],
        maxlength: 70
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('JobType', jobTypeSchema);