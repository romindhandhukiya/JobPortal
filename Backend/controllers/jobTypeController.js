const JobType = require('../models/jobTypeModel')
const ErrorResponse = require('../utils/errorResponse')

exports.createJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (err) {
        return next(err);
    }
}

exports.allJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.find();
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (err) {
        return next(err);
    }
}

exports.updateJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (err) {
        return next(err);
    }
}

exports.deleteJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Job Type Deleted"
        })
    } catch (err) {
        return next(new ErrorResponse('server error', 500));
    }
}