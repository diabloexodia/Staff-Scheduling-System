use staffschedule;

select * from employee_master;
select * from login_cred;
select * from schedule_master

select * from pending_requests
update schedule_master set Shift = 'Day' where Shift='India'; 
delete from employee_master where empid = 'EMP10006';
insert into schedule_master values  ('EMP10009' , 'Diluc' , 'AI dev', 'Night', 'Korea','2024-04-05','13:00','17:00');

delete from schedule_master where EMPID = 'EMP10001' and [Date] = '2024-04-01';

INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'AI developer', 'Day', 'USA', '2024-04-11', '08:00', '16:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'ML engineer', 'Night', 'Germany', '2024-04-18', '20:00', '04:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'Data analyst', 'Night', 'China', '2024-04-22', '22:00', '06:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'Software E', 'Day', 'Japan', '2024-04-25', '09:00', '18:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'Analyst', 'Day', 'Australia', '2024-04-29', '11:00', '19:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'AI developer', 'Day', 'Canada', '2024-04-01', '08:00', '16:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'ML engineer', 'Night', 'France', '2024-04-08', '20:00', '04:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'Data analyst', 'Night', 'India', '2024-04-15', '22:00', '06:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'Software E', 'Day', 'Brazil', '2024-04-19', '09:00', '18:00');
INSERT INTO schedule_master VALUES ('EMP10009' , 'Diluc' , 'Analyst', 'Day', 'Mexico', '2024-04-26', '11:00', '19:00');

	INSERT INTO schedule_master VALUES ('EMP10001' , 'Dhyan Prasad' , 'AI developer', 'Day', 'Afghanistan', '2024-04-01', '08:00', '16:00');