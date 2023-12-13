const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

//connection
mongoose.connect(process.env.DATABASE).then(()=> console.log("DB Connected"))
.catch((err)=> console.log(err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cookieParser()); //for authentication
app.use(cors());

//apis 
app.use('/api', authRoutes);
app.use('/api', userRoutes);

//error handling middleware
app.use(errorHandler);

//port 
const port = process.env.PORT || 9000;


app.listen(port, ()=> {
    console.log(`server runnig on port ${port}`);
});
