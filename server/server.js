var express =   require("express");
var multer  =   require('multer');
var app         =   express();

var uploadDir = '../src/assets/uploads/';

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({ storage : storage}).single('file');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/api/upload-image',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});