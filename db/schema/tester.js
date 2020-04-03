const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testerSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: 'testers' });

const createModel = function () {
    return mongoose.model("testers", testerSchema)
}

module.exports.createModel = createModel;
