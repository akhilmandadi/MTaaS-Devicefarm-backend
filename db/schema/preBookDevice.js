const mongoose = require('mongoose');

const PreBookDeviceSchema = new mongoose.Schema({
  deviceType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  osType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'available',
    enum: ['available','maintenance']
  }
})

module.exports.PreBookDevice = mongoose.model.PreBookDevice || mongoose.model('PreBookDevice',PreBookDeviceSchema);