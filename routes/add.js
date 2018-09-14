var express = require('express');
var router = express.Router();
var userService = require('../services/user');
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');
var recipieService = require('../services/recipie');

/* GET add listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/recipie', function(req, res, next) {
  res.render('index');  
});

router.post('/recipie', function(req, res, next) {
  // const params = req.body;
  // remove after debugging
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hcmV1uZHJhIiwiaWQiOjEsImlhdCI6MTUzNjkxMDAyNywiZXhwIjoxNTM3MTY5MjI3fQ.GaLwAjoQdapy5RuuW02nG-v_KEuegBB9MRohhlquAQY";
  let param = {
    name: "narendra1111",
    description: "kumawat",
    picture_url: " nknknknnkknk",
    u_id:""
  }
  tokenizer.varifyUser(token).then((data) => {
    if(data.status) {
        param.u_id = data.data.id;
        recipieService.addRecipie(param).then((recipie) => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.recipie = recipie;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
		    res.json(response);
        })
    }else {
        response.header.code = responseCodes.unAuthorized;
        response.body = {};
        response.body.success = false;
        res.json(response);
    }
  }).catch((err) => {
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);
  });
});
module.exports = router;
