//dependencies
const express=require('express');
const router=express.Router();
const invoiceModel = require('../models/invoice.js');


//routes
router.post('/invoices',(request,response)=>{//info saved in db uses post method
    const input = request.body;//contains info sent from the web browser
    console.log(request.body);
    const newDocument = new invoiceModel({
    projectId : input.projectId,
    paymentMode : input.paymentMode,
    transAmt : input.transAmt,
    billingPeriod : input.billingPeriod
    });

    

    //saving the info inside database
    newDocument.save((err,doc)=>{
        if(err){
            //error is caused
            console.log('ERROR'+err);
            response.status(500).json({message: 'Invoice not created due to error'})
        } else{
            //no error present
            console.log('The invoice creation is successful.');
            response.status(200).json({message: 'The invoice was created successfully'})

        }

    });
});

//exporting contents of the file(make file contents public)
module.exports=router;