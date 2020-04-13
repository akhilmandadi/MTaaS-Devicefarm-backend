const express=require('express');
const router=express.Router();
const invoiceModel = require('../models/invoice.js');

//routes
router.get('/allinvoices',(request,response)=>{

    invoiceModel.find((err, docs)=>{
        if(err){
            //error is caused
            console.log('ERROR'+err);
            response.status(500).json({message: 'Reading information not possible'});
        } else{
            //no error present
            console.log('All invoices found.');
            response.status(200).json(docs);
            }
    //response.send('<h1>Hello from router delete.js</h1>');
        
});
});

router.get('/readinvoice/:invoiceId',(request, response)=>{
    invoiceModel.findOne({
        _id:request.params.invoiceId
},(err, invoice)=>{
    if(err){
        //error
        console.log('ERROR'+err);
        response.status(500).json({message: 'Reading information not possible'});
    }else{
            //no error present
            console.log('invoice found.');
            response.status(200).json(invoice);
        }
    });
});

//exporting contents of the file(make file contents public)
module.exports=router;