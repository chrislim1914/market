var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display all users products
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * from users INNER JOIN products ON users.id = products.productendoreseid ORDER BY idproduct desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/products/index.ejs
            res.render('products',{data:'', title: 'Products'});
        } else {
            // render to views/products/index.ejs
            res.render('products',{data:rows, title: 'Products'});
        }
    });
});


module.exports = router;