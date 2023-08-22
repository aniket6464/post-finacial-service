var express = require('express');

var router = express.Router();

var database = require('../database');
const { render } = require('ejs');

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
	(customer_name, address, city, state , age , post_office ,profession,mobileno,email,username,c_password) 
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

	response.render('post_service', {title:'', action:'login', message:request.flash('success')});
});

//get username and password 
router.post("/up", function(request, response, next){

	var u = request.body.username;

	var p = request.body.password;

	var v = u + "&" + p;

	response.redirect("/post_service/index/" + v );
});

//move customer into index page 
router.get("/index/:credential", function(request, response, next){

	var uap = request.params.credential;
	var uap_arr = uap.split("&");

	var username = uap_arr[0];
	var password = uap_arr[1];

	var query=`select * from customer where username="${username}"`;

	database.query(query, function(error, data){

		if ( data[0].c_password == password){
			response.render('post_service', {title:'', action:'index', sampleData:data[0], message:request.flash('success')});
		} else {
			response.redirect("/post_service/login");
		}
	})
})

//move customer into all scheme page 
router.get("/allscheme/:credential", function(request, response, next){

	var uap = request.params.credential;
	var uap_arr = uap.split("&");

	var username = uap_arr[0];
	var password = uap_arr[1];

	var query=`select * from customer where username="${username}"`;

	database.query(query, function(error, data){
		if ( data[0].c_password == password){
			response.render('post_service', {title:'', action:'allscheme', sampleData:data[0], message:request.flash('success')});
		} else {
			response.redirect("/post_service/login");
		}
	})
})

module.exports = router;