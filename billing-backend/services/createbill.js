//dependencies
const express=require('express');
const router=express.Router();
const billModel = require('../models/bill.js');


//routes
router.post('/bills',(request,response)=>{//info saved in db uses post method
    const input = request.body;//contains info sent from the web browser
    console.log(request.body);
    const newDocument = new billModel({
    projectId : input.projectId,
    billingPeriod : input.billingPeriod,
    amountPaid : input.amountPaid,
    totalCost: input.totalCost,
    due: input.due
    });

    

    //saving the info inside database
    newDocument.save((err,doc)=>{
        if(err){
            //error is caused
            console.log('ERROR'+err);
            response.status(500).json({message: 'Bill not created due to error'})
        } else{
            //no error present
            console.log('The bill creation is successful.');
            response.status(200).json({message: 'The bill was created successfully'})

        }

    });
});

//exporting contents of the file(make file contents public)
module.exports=router;