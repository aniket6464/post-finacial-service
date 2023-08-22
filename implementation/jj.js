const {createPool} = require('mysql');

const pool = createPool({
	host : 'localhost',
	database : 'post',
	user : 'root',
	password : ''
});

var u="kartik";
var v="kartik";

// if (u == v) {
// 	console.log("both");
// }

pool.query(`select * from customer where username = "${u}"`, (err ,res) => {

	if ( res[0].c_password == v ) {
		console.log(res)
	}
}) 
