var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display all users
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM users ORDER BY id desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users',{data:''});
        } else {
            // render to views/users/index.ejs
            res.render('users',{data:rows});
        }
    });
});

// display add users page
router.get('/add', function(req, res, next) {
    // render to users.ejs
    res.render('users/add', {
        name: '',
        email: ''
    })
})

// add a new users
router.post('/add', function(req, res, next) {

    let name = req.body.name;
    let email = req.body.email;
    let errors = false;

    if(name.length === 0 || email.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter parameter");
        // render to add.ejs with flash message
        res.render('users/add', {
            name: name,
            email: email
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
          name: name,
          email: email
        }

        // insert query
        dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('users/add', {
                    name: form_data.name,
                    email: form_data.email
                })
            } else {
                req.flash('success', 'User successfully added');
                res.redirect('/users');
            }
        })
    }
})

module.exports = router;