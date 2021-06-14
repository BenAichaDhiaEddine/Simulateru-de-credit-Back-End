export {};
var path = require('path');
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    upload: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    fileType: {
      type: String
    },
    fileName: {
      type: String
    },
    download: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'filePath', 'fileType', 'upload', 'download', 'createdAt'];

function getFileName(filePath: String) {
  return path.parse(filePath).name;
}

fileSchema.pre('save', function (next: any) {
  this.fileName = getFileName(this.filePath);
  next();
});

/**
 * @typedef File
 */
const File = mongoose.model('File', fileSchema);
File.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = File;
