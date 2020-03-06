use join_us;

create table
if not exists users
(
  id int auto_increment primary key,
  email VARCHAR
(255) unique,
  created_at TIMESTAMP default NOW
()
);

create table
if not exists interests
(
  id int auto_increment primary key,
  interest_name varchar
(100) unique
);

create table
if not exists user_interests
(
    user_id int not null,
    interest_id int not null,
    foreign key
(user_id) references users
(id),
    primary key
(user_id, interest_id)
);