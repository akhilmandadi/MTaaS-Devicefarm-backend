const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb+srv://praneethasripada:neetha95'+
'@billingcomponentapp-b06qb.gcp.mongodb.net/billingComponentStorage?'+
'retryWrites=true&w=majority')

//mongoose schema
const billSchema = new mongoose.Schema({
_id: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
        required: true,
        //ref: 'billNo',
        // auto: true
},
projectId: {
    type: Number, 
    required: true
},
billingPeriod: {
    type: String,
    required: true
},
amountPaid: {
    type: Number,
    required: true
},
totalCost: {
    type: Number,
    required: true
},
due: {
    type: Number,
    required: true
}
});


var billModel = connection.model('billModel', billSchema);
billSchema.plugin(autoIncrement.plugin, {field: '_id',
model: 'billModel',
startAt: 1001,
incrementBy: 1});

//exporting
module.exports=mongoose.model( 'bill', billSchema );
