const express=require('express');
const router=express.Router();
const invoiceModel = require('../models/bill.js');

//routes
router.get('/totalbills',(request,response)=>{

    invoiceModel.find((err, docs)=>{
        if(err){
            //error is caused
            console.log('ERROR'+err);
            response.status(500).json({message: 'Reading information not possible'});
        } else{
            //no error present
            console.log('All bills found.');
            response.status(200).json(docs);
            }
        });
    });

    module.exports=router;