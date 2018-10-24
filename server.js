const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = 1337;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./feedback.db');

const nodemailer = require('nodemailer');

const feedbackTransport = nodemailer.createTransport({
    host: 'smtp.livemail.co.uk',
    port: 465,
    secure: true,
    auth: {
        user: 'feedback@pixsellar.com',
        pass: 'Qw12er34'
    }
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/feedback', (req, res) =>
  db.all('SELECT * FROM feedback', (err, rows) => {
    res.send(rows);
  })
);

app.post('/feedback', (req, res) => {
  console.log(req.body);
  let name = JSON.stringify(req.body.name);
  let email = JSON.stringify(req.body.email);
  let website = JSON.stringify(req.body.website);
  let comment = JSON.stringify(req.body.comment);
  db.run(
    `INSERT INTO feedback (name,email,website,comment) VALUES (${name},${email},${website},${comment})`
  );
  res.send('Done!');
  let mailOptions = {
      from: '"Pixsellar Support" <feedback@pixsellar.com>',
      to: email,
      subject: 'Thanks!',
      text: 'Thanks for your feedback!'
  }

  feedbackTransport.sendMail(mailOptions, (error,info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent:', info.messageId);
  })
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
