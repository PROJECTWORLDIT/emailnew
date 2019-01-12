var express = require('express');
var nodemailer = require("nodemailer");
var handlebars = require('handlebars');

var fs = require('fs');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "insindia123@gmail.com",
    auth: {
        user: "insindia123@gmail.com",
        pass: "yakqnmpebmgojdpc"
    }
});

var readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

var senddata = function(data) {

}


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

router.get('/send', function(req, res) {

    readHTMLFile(__dirname + '/' + '../views/email.ejs', function(err, html) {
        var template = html;

        var mailOptions = {
            from: 'insindia123@gmial.com',
            to: req.query.to,
            subject: req.query.subject,
            text: req.query.text,
            html: template
        }

        console.log(JSON.stringify(mailOptions));
        smtpTransport.sendMail(mailOptions, function(error, response) {
            console.log('01', error, response);
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
        });
    });

});

module.exports = router;