var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user:'zs976pdlnzh939t7',
	password:'zs46jn3kcrfcdhku',
	database:'sktllai1ktqlzhdh',
	multipleStatements: true
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;