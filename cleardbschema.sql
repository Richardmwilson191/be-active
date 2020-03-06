create table users
(
  id int
  auto_increment primary key,
  email VARCHAR
  (255) unique,
  created_at TIMESTAMP default NOW
  ()
);