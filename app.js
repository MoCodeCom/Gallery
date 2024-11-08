const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoute = require('./routes/api');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

const cors = require('cors');
const PORT = process.env.PORT || 3000;
const Controller404 = require('./controllers/ErrorController');

/****************************************************/
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
/****************************************************/
//app.set('view engine','html')

//app.use('/api',apiRoute);


//CORS
app.use(cors({
    origin:'*',
    credentials:true,
    methods:['POST','GET','PUT','OPTIONS','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Origin','GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'Content-Type, Authorization');
    next();
});
app.use(express.static(path.join(__dirname, 'dist/your-angular-webapp')));
app.use('/api',apiRoute);

/***************************************************/
/************ In Error Case ************************/
app.use(Controller404.get404);
/***************************************************/

//server.listen(3000);
app.listen(PORT, console.log(`Server running on port ${PORT}`));