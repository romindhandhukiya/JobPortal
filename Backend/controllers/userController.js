const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/userModel')

exports.allUsers = async (req, res, next) => {

    //pagination 
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page-1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            users,
            page, 
            pages: Math.ceil(count/pageSize),   
            count
        })
        next();
    } catch (err) {
        return next(err);
    }
}


exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (err) {
        return next(err);
    }
}

exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (err) {
        return next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
        next();
    } catch (err) {
        return next(err);
    }
}
