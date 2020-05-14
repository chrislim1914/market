var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display all products
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM products ORDER BY idproduct desc',function(err,rows)     {

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

// display match people
router.get('/match/(:id)', function(req, res, next) {
    let id = req.params.id;
    let title = '';
    let idproduct = '';
    let productname = '';
    let userslist = [];

    dbConn.query('SELECT * FROM products WHERE idproduct =' + id, function(err, rows, fields) {
        if(err) throw err

        // if product not found
        if (rows.length <= 0) {
            req.flash('error', 'product not found with id = ' + id)
            res.redirect('/products/match')
        }
        title = 'Matching';
        idproduct = rows[0].idproduct;
        productname = rows[0].productname;
    });

    dbConn.query('SELECT * FROM orders WHERE idproduct =' + id, function(err, second, fields) {
        if(err) throw err

        for(let i = 0; i < second.length; i++) {
            dbConn.query('SELECT * FROM users where id =' + second[i].buyerid, function(error, third, fields) {
                console.log(third);
                if(error) throw error
                if (third.length) {
                    userslist.push(third[0]);
                } else {
                    req.flash('error', 'no match!');
                    res.redirect('/products/match');
                }
            });
        }
        console.log(userslist);
        // render to edit.ejs
        res.render('products/match', {
            title: title,
            idproduct: idproduct,
            productname: productname,
            other: userslist
        })
    });
});

module.exports = router;