var Menu = require('../models/menu');


exports.loadMain = function(req, res, next) {
    Menu.find({}).limit(10).exec(function (err,menu) {
        console.log(req.session.passport);
        res.render('index', {title: 'Express', passport: req.session.passport, menu:menu})
    });
};