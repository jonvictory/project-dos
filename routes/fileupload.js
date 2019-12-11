const express = require('express')
const router = express.Router()
const { upload } = require('../multer-s3-fileupload/s3UploadClient')
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

// Upload a file
app.post("/upload", upload.array('inputFile', 3), function(req, res) {
  if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })

 res.status(201).json({
    return: 'Successfully uploaded ' + req.files.length + ' files!',
    files: req.files
  })
});

}

