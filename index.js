const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))// serving our contact form on '/' route

app.post('/sendemail', (req,res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'buffshloy55@gmail.com',
        pass: 'havamacherie'//replace with your password
        }
        });

    var mailOptions = {
        from: 'buffshloy55@gmail.com',//replace with your email
        to: 'buffchloy55@gmail.com',//replace with your email
        subject: `Contact name: ${req.body.name}`,
        html:`<h1>Contact details</h1>
        <h2> name:${req.body.name} </h2><br>
        <h2> email:${req.body.email} </h2><br>
        <h2> phonenumber:${req.body.phonenumber} </h2><br>
        <h2> message:${req.body.message} </h2><br>`
        };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.send('error') // if error occurs send error as response to client
        }
        else {
        console.log('Email sent: ' + info.response);
        res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
        }
        });    
})

app.listen(1234);



