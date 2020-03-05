use join_us;

INSERT INTO users (email) VALUES('Katie34@yahoo.com'), ('Tunde@gmail.com');

select * from users order by created_at;

-- 1. Earliest date a user joined
select 
	date_format(created_at, '%M %D %Y') as earliest_date 
from users
order by created_at
limit 1;

-- 2. Find the email of the earliest user
select 
	*
from users
order by created_at
limit 1;

-- 3 Number of users according to the month they joined
select 
	monthname(created_at) as 'month',
    count(*) as 'count'
from users
group by monthname(created_at)
order by count(*) desc;

-- 4. Count the numeber of user with yahoo emails
select 
	count(*) as yahoo_users
from users
where email like '%@yahoo.com';

-- 5. Count the total number of users with each email provider
select 
	case
		when email like '%@yahoo.com' then 'yahoo'
        when email like '%@gmail.com' then 'gmail'
        when email like '%@hotmail.com' then 'hotmail'
        when email like '%@other.com' then 'other'
	end as provider, count(*) as total_user
from users
group by
	case
		when email like '%@yahoo.com' then 'yahoo'
        when email like '%@gmail.com' then 'gmail'
        when email like '%@hotmail.com' then 'hotmail'
        when email like '%@other.com' then 'other'
	end
order by total_user desc;

-- More concise method
select 
	case
		when email like '%@yahoo.com' then 'yahoo'
        when email like '%@gmail.com' then 'gmail'
        when email like '%@hotmail.com' then 'hotmail'
        when email like '%@other.com' then 'other'
	end as provider, count(*) as total_user
from users
group by provider
order by total_user desc;