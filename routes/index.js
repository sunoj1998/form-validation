var express = require('express');
var router = express.Router();
const userHelper = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
  
});
router.post('/submit',function(req,res){
  console.log(req.body)
  userHelper.doSignUp(req.body).then((data)=>{
    console.log(data)
    res.send('registered successfully')
  })
  
})
router.get('/login',function(req,res){
   res.render('login')
})

router.get('/register',function(req,res){
  res.render('register')
})

router.post('/login',function(req,res){
  userHelper.doLogin(req.body).then((response) => {
    if(response.status){
      
      req.session.loggedIn = true;
      req.session.user = response.user;
      
      res.send('you have successfully signed in');
    }else{
      req.session.loginErr = true;
      res.send('invalid username or password')
    }
  })
})

module.exports = router;
