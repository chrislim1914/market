var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    let ids = [];
    let idlist = [];

    dbConn.query('SELECT * FROM products',function(err,rows) {
        if(err) throw err

        if (rows.length > 0) {
            for (x of rows) {
                ids.push(x['productendoreseid']);
            }
        }
        
        for(let i=0;i<8;++i) {
            randomID = ids[Math.floor(Math.random() * ids.length)];
            if(idlist.indexOf(randomID) !== -1){
                i -= 1;
            } else{
                idlist.push(randomID);
            }
        }

        dbConn.query('SELECT * FROM users WHERE id IN (' + idlist.join() + ')', function(err, lastrows){
            if(err) throw err

            if (lastrows.length > 0) {    
                        
                res.render('simulation',{
                    title: 'Simulation',
                    data: lastrows
                });
            }
        });
    });
});

module.exports = router;