insert into authorized_users ( username, password)
values ($1, $2);

select username, user_id from authorized_users where username = $1 and password = $2;