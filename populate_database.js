const faker = require('faker');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lovedayna100',
  database: 'join_us'
});

connection.connect();

// var q = 'SELECT COUNT(*) AS total FROM users ';

// connection.query(q, function(error, results, fields) {
//   if (error) throw error;
//   console.log(results[0].total);
// });

// 1 way of inserting data

// var q = 'INSERT INTO users (email) VALUES ("rusty_the_dog@gmail.com")';

// connection.query(q, function(error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// An easier approach that allows for dynamic data

// var person = {
//   email: faker.internet.email(),
//   created_at: faker.date.past()
// };

// var end_result = connection.query('INSERT INTO users SET ?', person, function(
//   err,
//   result
// ) {
//   if (err) throw err;
//   console.log(result);
// });

// Multiple insert with an array method

var data = [];
for (var i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

connection.end();
