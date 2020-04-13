const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb+srv://praneethasripada:neetha95'+
'@billingcomponentapp-b06qb.gcp.mongodb.net/billingComponentStorage?'+
'retryWrites=true&w=majority')
//mongoose schema
const invoiceSchema = new mongoose.Schema({
_id: {
    type: Number,
    required: true,
    ref: 'invoiceid'
    // auto:true
},
projectId: {
    type: Number,
    required: true
},
paymentMode: {
    type: String, 
    required: true
},
transAmt:{
    type: Number,
    required: true
},
billingPeriod: {
    type: String,
    required: true
}
});
var invoiceModel = connection.model('invoiceModel', invoiceSchema);
invoiceSchema.plugin(autoIncrement.plugin, {field: '_id',
model: 'invoiceModel',
startAt: 101,
incrementBy: 1});
//exporting
module.exports=mongoose.model( 'invoice', invoiceSchema );
