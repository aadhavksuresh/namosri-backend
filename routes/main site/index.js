var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('delispices/index', { active: 'home' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('delispices/aboutus', { active: 'aboutus' });
});
router.get('/contact', function(req, res, next) {
  res.render('delispices/contact', { active: 'contact' });
});
router.get('/privacy', function(req, res, next) {
  res.render('delispices/privacy', { active: '' });
});
router.get('/statutory', function(req, res, next) {
  res.render('delispices/statutory', { active: '' });
});
router.get('/terms', function(req, res, next) {
  res.render('delispices/terms', { active: '' });
});


module.exports = router;
