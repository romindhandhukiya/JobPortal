const Job = require('../models/jobModel')
const JobType = require('../models/jobTypeModel')
const ErrorResponse = require('../utils/errorResponse')

exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            JobType: req.body.JobType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (err) {
        return next(err);
    }
}

exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (err) {
        return next(err);
    }
}

exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
        .populate('jobType', 'jobTypeName')
        .populate('user', 'firstName lastName')
        res.status(200).json({
            success: true,
            job
        })
    } catch (err) {
        return next(err);
    }
}

exports.showJobs = async (req, res, next) => {

    //searching
    const keyword = req.query.keyword ? {
        title:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //filtering by category
    let ids = [];
    const jobTypeCategory = await JobType.find({}, {_id:1});
    jobTypeCategory.forEach(cat => { ids.push(cat._id)});
    let cat = req.query.cat;
    let categ = cat !== "" ? cat : ids;
    
    //by locations 
    let locations = [];
    const jobByLocation = await Job.find({}, {location: 1});
    jobByLocation.forEach(loc => {
        locations.push(loc.location);
    })
    let setUniqueLocations = [ ...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== "" ? location : setUniqueLocations;

    //pagination 
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    // const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).sort({ createdAt: -1 }).skip(pageSize*(page-1)).limit(pageSize);
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count/pageSize),   
            count,
            setUniqueLocations
        })
    } catch (err) {
        return next(err);
    }
}