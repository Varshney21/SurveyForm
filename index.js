var bodyParser = require('body-parser');
var url = require('url');
var path = require('path');
var fs = require('fs');
var nodemailer = require('nodemailer');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/form.html'));
  //__dirname : It will resolve to your project folder.
});

app.post('/formsubmit',function(req,res){
	var F_Age = req.body.Age;
	var F_Gender = req.body.Gender;
	var F_V_A3 = req.body.V_A3;
	var F_name = req.body.name;
	var F_mess = req.body.mess;
	var F_V_A4 = req.body.V_A4;

		var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'saurav.varshney02@gmail.com',
		    pass: '21011999'
		  }
		});

		var mailOptions = {
		  from: 'saurav.varshney02@gmail.com',
		  to: 'sv4672@gmail.com',
		  subject: 'user ' + F_name + ' submitted the contact us form and here are the details',
		  text: 'Age: '+F_Age+', Gender: '+F_Gender+', How would he like his health life-style change care to be delivered? '+F_V_A3+
		  ', Any thing else he want to specify '+F_mess+', How comfortable he is with sharing your fitness information(in social media or focus groups)'+F_V_A4

		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});

});

app.listen(3000);