var express = require('express');
var upload = require('express-fileupload');
var db = require.main.require('./models/db');
var userModel = require.main.require('./models/user');

var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/', function(req, res){
 res.render('home/index', {uname: req.session.username});
	
});

router.get('/upload', function(req, res){
	res.render('home/upload');
});

router.post('/upload',function(req,res){
	if(req.files){
	  var file= req.files.file;
	  var filename = file.name;
	console.log(filename);
	file.mv('./assets/'+filename, function (err)
	{
		if(err)
		{
			res.send(err);
		}
		else{
			var user ={
			uname 		: filename,
			
			id		: req.body.id
		}

		uploadModel.insert(user, function(status){
			if(status){
				res.redirect('/home/upload/notes');
			}else{
				res.redirect('/home/upload/notes');
			}
		});
		}
	})
	}
});




router.get('/profile', function(req, res){


		var username = req.session.username;
		userModel.getByUname(username, function(results){

			res.render('home/profile', { userList : results, uname: req.session.username});
		});

	
});









router.get('/studentsinfo', function(req, res){
	        userModel.students(function(results){
			res.render('home/studentsinfo', { userList : results, uname: req.session.username});
		});
	
});
router.get('/studentsinfo/studentupdate/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/studentupdate', {user: result});
	});
	
});

router.post('/studentsinfo/studentupdate/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.update(user, function(status){
		if(status){
			res.redirect('/home/studentsinfo');
		}else{
			res.redirect('/home/studentsinfo');
		}
	});
	
});
router.get('/studentsinfo/studentdelete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/studentdelete', {user: result});
	});
	
});
router.post('/studentsinfo/studentdelete/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/studentsinfo');
		}else{
			console.log('Couldnot delete');
			res.redirect('/home/studentsinfo');
		}
	});
	
});
router.get('/teachersinfo', function(req, res){
	        userModel.teachers(function(results){
			res.render('home/teachersinfo', { userList : results, uname: req.session.username});
		});
	
});
router.get('/teachersinfo/teacherupdate/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/teacherupdate', {user: result});
	});
	
});

router.post('/teachersinfo/teacherupdate/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.update(user, function(status){
		if(status){
			res.redirect('/home/teachersinfo');
		}else{
			res.redirect('/home/teachersinfo');
		}
	});
	
});
router.get('/teachersinfo/teacherdelete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/teacherdelete', {user: result});
	});
	
});
router.post('/teachersinfo/teacherdelete/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/teachersinfo');
		}else{
			console.log('Couldnot delete');
			res.redirect('/home/teachersinfo');
		}
	});
	
});
router.get('/tpinfo', function(req, res){
	        userModel.tp(function(results){
			res.render('home/tpinfo', { userList : results, uname: req.session.username});
		});
	
});
router.get('/tpinfo/tpupdate/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/tpupdate', {user: result});
	});
	
});

router.post('/tpinfo/tpupdate/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.update(user, function(status){
		if(status){
			res.redirect('/home/tpinfo');
		}else{
			res.redirect('/home/tpinfo');
		}
	});
	
});
router.get('/tpinfo/tpdelete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/tpdelete', {user: result});
	});
	
});

router.post('/tpinfo/tpdelete/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/tpinfo');
		}else{
			res.redirect('/home/tpinfo');
		}
	});
	
});



router.get('/adduser', function(req, res){
	        
			res.render('home/adduser');
});

router.post('/adduser', function(req, res){
	


		var user ={
			fullname 	: req.body.fullname,
			password	: req.body.password,
			
			mobile		: req.body.mobile,
			type		: req.body.type
			
			 
		};

		userModel.insertadmin(user, function(status){
			if(status){
				console.log("Successful");
				
				res.render('home/adduser');
				
			}else{
				console.log("Unsuccessful");
				res.redirect('home/adduser');
			}
		});
	
});

router.get('/adduser/showtotalemployee', function(req, res){
	        userModel.getAll(function(results){
			res.render('home/showtotalemployee', { userList : results, uname: req.session.username});
		});	
});







router.get('/profile/edit/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/pedit', {user: result});
	});
	
});

router.post('/profile/edit/:id', function(req, res){
	
		var user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.update(user, function(status){
		if(status){
			res.redirect('/home/profile');
		}else{
			res.redirect('/home/profile');
		}
	});
	
});
router.get('/profile/delete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/profiledelete', {user: result});
	});
	
});
router.post('/profile/delete/:id', function(req, res){
	
		var user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/login');
		}else{
			console.log('Couldnot delete');
			res.redirect('/home/profile');
		}
	});
	router.get('/adduser/showtotalemployee/empupdate/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/empupdate', {user: result});
	});
	
   });

   router.post('/adduser/showtotalemployee/empupdate/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		mobile: req.body.mobile,
		type: req.body.type,
	    id: req.params.id
	};

 userModel.empupdate(user, function(status){
		if(status){
			res.redirect('/home/adduser/showtotalemployee');
		}else{
			res.redirect('/home/adduser/showtotalemployee');
		}
	});
	
});
	router.get('/adduser/showtotalemployee/empdelete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/empdelete', {user: result});
	});
	
   });

   router.post('/adduser/showtotalemployee/empdelete/:id', function(req, res){
	
		var user = {
		username: req.body.uname,
		password: req.body.password,
		mobile: req.body.mobile,
		type: req.body.type,
	    id: req.params.id
	};

 userModel.delete(user, function(status){
		if(status){
			res.redirect('/home/adduser/showtotalemployee');
		}else{
			res.redirect('/home/adduser/showtotalemployee');
		}
	});
	
});
	
});


module.exports = router;