var express = require('express');

var router = express.Router();

var database = require('../database');

//move into sign up form 
router.get("/", function(request, response, next){

	response.render('post_service', {title:'', action:'signup', message:request.flash('success')});

});

//add data to database for customer 
router.post("/add_data_for_c/", function(request, response, next){

	var name = request.body.name;
	var address = request.body.address;
	var city = request.body.city;
	var state = request.body.state;
	var age = request.body.age;
	var post_office = request.body.post_office;
	var profession = request.body.profession;
	var mobile_no = request.body.mobile_no;
	var email = request.body.email;
	var username = request.body.username;
	var password = request.body.password;

	var query = `
	INSERT INTO customer 
	(customer_name, address, city, state , age , post_office ,profession,mobileno,email,username,password) 
	VALUES ("${name}", "${address}", "${city}", "${state}","${age}", "${post_office}", "${profession}", "${mobile_no}","${email}", "${username}", "${password}")`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/post_service/");
		}

	});
});

//move into login page 
router.get("/login", function(request, response, next){

	response.render('post_service', {title:'', action:'login'});

});


router.get("/index", function(request, response, next){

	var u=request.body.username;

	var p=request.body.password;

	var query = `select * from customer`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.render('post_service', {title:'', action:'index', sampleData:data, message:request.flash('success')});
			// var d = data.c_password;

			// if( d == p ){
			// 	response.render('post_service', {title:'', action:'index', sampleData:data, message:request.flash('success')});
			// } else {
			// 	response.render('post_service', {title:'', action:'signup', sampleData:data, message:request.flash('success')});
			// }
		}

	});
});
module.exports = router;