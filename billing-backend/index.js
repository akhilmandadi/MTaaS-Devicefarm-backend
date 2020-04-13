//dependencies
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.createConnection('mongodb+srv://praneethasripada:neetha95'+
'@billingcomponentapp-b06qb.gcp.mongodb.net/billingComponentStorage?'+
'retryWrites=true&w=majority'));
//static web server
app.use(express.static(path.join(__dirname,'dist')));
app.use(cors());

//connection to MongoDB
mongoose.connect('mongodb+srv://praneethasripada:neetha95'+
'@billingcomponentapp-b06qb.gcp.mongodb.net/billingComponentStorage?'+
'retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//method to handle errors(callback function)
mongoose.connection.on('error', (error)=>{
    console.log('ERROR'+ error);
});

//method when everything is working
mongoose.connection.once('open',()=>{
    console.log('The connection to MongoDB Atlas is working');
});

//body-parser-enables application to handle i/p that comes from body-parser-saved as object with json properties and methods
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
//app.get('/hello',(Request, Response )=>{
//Response.send('<h1>Welcome to billing component</h1>');
//});

//rest APIs
app.use(require('./services/createinvoice.js'));//file with code run when path used
app.use(require('./services/createbill.js'));
app.use(require('./services/viewinvoices.js'));
app.use(require('./services/viewbills.js'));
app.get('*',(request, response)=>{//* means any url you want to visit is handled by this code in billing.html-
                                 //which contains react app
    response.sendFile(path.join(__dirname, 'dist/billing.html'));
});
//app.get('*',(request, response)=>{
    //response.send("<h1>404: Page not found</h1>");
//});
//ports
app.listen(3000, ()=>{
    console.log('Listensing at Localhost: 3000');
});
