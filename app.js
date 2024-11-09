const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const apiRoute = require('./routes/api');

const cors = require('cors');
const PORT = process.env.PORT || 3000;
const Controller404 = require('./controllers/ErrorController');

/****************************************************/
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/****************************************************/


//CORS
app.use(cors({
    origin:true,
    credentials:true,
    methods:'POST,GET,PUT,OPTIONS,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use((req,res,next)=>{
    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Origin','GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'Content-Type, Authorization');
    next();
});



app.use('/api',apiRoute);



/***************************************************/
/************ In Error Case ************************/
app.use(Controller404.get404);
/***************************************************/

//server.listen(3000);
app.listen(PORT, console.log(`Server running on port ${PORT}`));