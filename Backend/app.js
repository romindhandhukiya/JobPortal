const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');


//connection
mongoose.connect(process.env.DATABASE).then(()=> console.log("DB Connected"))
.catch((err)=> console.log(err));

//port 
const port = process.env.PORT || 9000;


app.listen(port, ()=> {
    console.log(`server runnig on port ${port}`);
});
