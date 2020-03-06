insert into interests
  (interest_name)
values
  ('calisthenics'),
  ('bodybuilding'),
  ('strenth_training'),
  ('power_lifting'),
  ('olympic_lifting'),
  ('functional_training'),
  ('crossfit'),
  ('endurance_training');

select *
from users;

select *
from interests;

select *
from user_interests;


insert into user_interests
  (user_id, interest_id)
values
  (1, 2),
  (2, 1),
  (10, 3);

drop table user_interests, interests, users;