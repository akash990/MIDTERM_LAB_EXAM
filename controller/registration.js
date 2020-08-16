var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res){

		res.render('registration/index');
	
});

router.post('/', function(req, res){
	


		var user ={
			fullname 	: req.body.fullname,
			password	: req.body.password,
			
			mobile		: req.body.mobile,
			type		: req.body.type
			
			 
		};

		userModel.insertadmin(user, function(status){
			if(status){
				console.log("Successful");
				res.redirect('/login');
			}else{
				console.log("Unsuccessful");
				res.redirect('/login');
			}
		});
	
});

router.get('/rules', function(req, res){

		res.render('registration/rules');
	
});


module.exports = router;