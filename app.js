// const alert = require('alert-node');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get('/', function (req, res) {
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

  let app_data = [];
  let get_interests_query = 'select * from interests';

  connection.query(get_interests_query, function (error, results, fields) {
    if (error) throw error;
    app_data = results;
  });

  let number_of_users_query = 'select count(*) as total from users';

  connection.query(number_of_users_query, function (error, results, fields) {
    if (error) throw error;
    app_data.push(results[0]);
    res.render('app', { app_data: app_data });
  });

  connection.end(function (err) {
    if (err) {
      console.error('error ending connection: ' + err.stack);
      return;
    }

    console.log('Connection ended!');
  });
});

app.post('/register', function (req, res) {
  let email = req.body.email;
  let interest_id = req.body.training;
  let person = {
    email: req.body.email,
  };

  let user_email_q = 'SELECT COUNT(*) as total FROM `users` WHERE `email` = ?';

  connection.query(user_email_q, [email], function (err, result) {
    if (err) throw err;

    if (result[0].total == 1) {
      // alert('This email has already been used.');
      res.redirect('/');
    } else {
      connection.query('INSERT INTO users SET ?', person, function (
        err,
        result
      ) {
        if (err) throw err;
      });

      let user_id_q = 'SELECT `id` FROM `users` WHERE `email` = ?';

      connection.query(user_id_q, [email], function (err, result) {
        if (err) throw err;

        // insert into user_interests table
        if (typeof interest_id != 'undefined') {
          let data = [];
          for (let i = 0; i < interest_id.length; i++) {
            data.push([result[0].id, interest_id[i]]);
          }

          let q = 'INSERT INTO user_interests (user_id, interest_id) VALUES ?';
          connection.query(q, [data], function (err, result) {
            if (err) throw err;
          });
        }
        res.redirect('/');
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
