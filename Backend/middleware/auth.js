const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch(err){
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
} 


//is admin or not 
exports.isAdmin = async (req, res, next) => {
    if(req.user.role === 0){
        return next(new ErrorResponse("Access denied, you must be an Admin", 401));
    }
    next();
}