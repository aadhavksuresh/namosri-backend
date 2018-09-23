var express = require('express');
var router = express.Router();
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');
var recipeService = require('../services/recipe');



/* GET add listing. */

var multer  =   require('multer');
var filename ;
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/images/ProductImages/'); // set the destination
    },
    filename: function(req, file, callback){
    	filename = Date.now() + '.jpg';
        callback(null, filename); // set the file name and extension
    }
});

var upload = multer({storage: storage});

// var upload = multer({dest: './public/'});

router.post('/photo',upload.single('productPhoto'),  (req, res) => {

	// upload(req,res,function(err) {
 //        if(err) {
 //            return res.end("Error uploading file.");
 //        }
 //        res.end("File is uploaded");
 //    });	
    // let params = req.body;
    // tokenizer.varifyUser(params.token).then(user => {
    //    upload(req,res,function(err) {
    //     if(err) {
    //         return res.end("Error uploading file.");
    //     }
    //     res.end("File is uploaded");
    // });
        
    // }).catch(err => {
        response.header.code = "404";
        response.body = {};
        response.body.success = true;
        response.body.result = filename;
        res.json(response);
    // });
});


module.exports = router;
