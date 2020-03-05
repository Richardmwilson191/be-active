USE join_us;

CREATE TABLE users
(
  id int auto_increment primary key,
  email VARCHAR(255) unique,
  created_at TIMESTAMP DEFAULT NOW()
);

create table interests
(
  id int auto_increment primary key,
  interest_name varchar(100) unique
);

create table user_interests
(
    user_id int not null,
    interest_id int not null,
    foreign key (user_id) references users(id),
    primary key (user_id, interest_id)
);