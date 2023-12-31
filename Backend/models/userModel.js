const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = mongoose.Schema;

const jobsHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70
    },
    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true
    },
    location:{
        type: String,
    },
    interviewDate: {
        type: Date
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true})

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, "First Name is Required"],
        maxlength: 32
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last Name is Required"],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email Name is Required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please Add a valid Email"
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is Required"],
        minlength: [6, "Password must have atleast 6 character"]
    },
    jobsHistory: [ jobsHistorySchema ],
    role:{
        type: String,
        default: 0
    }

}, {timestamps: true})

//password encryption 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//compare method
userSchema.methods.comparePassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
}

//getjwttoken method
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET_KEY, { expiresIn: 3600});
}

module.exports = mongoose.model('User', userSchema);