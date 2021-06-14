export { };
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  activated: {
    type: Boolean,
    required: true
  },
  sentFiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  }],
  recievedFiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }]
})


const ALLOWED_FIELDS = ['id', 'request','activated', 'sentFiles', 'recievedFiles'];

/**
 * @typedef Upload
 */
const Upload = mongoose.model('Upload', uploadSchema);
Upload.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Upload;
