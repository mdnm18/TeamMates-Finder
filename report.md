
TEAMMATES FINDER

21CSC205P - Database Management Systems
 
A MINI PROJECT REPORT 
Submitted by
MD NAYAJ MONDAL [RA2411003011072]
 KRISHNA MAHESHWARI [RA2411003011091]

Under the Guidance of
(DR.M.KARTHIKEYAN)

(Associate Professor, C.Tech)

In partial fulfilment of the requirements for the degree of
BACHELOR OF TECHNOLOGY
in
COMPUTER SCIENCE ENGINEERING 
with specialization in (CORE)










DEPARTMENT OF NETWROKING AND COMMUNICATIONS
SCHOOL OF COMPUTING		
COLLEGE OF ENGINEERING AND TECHNOLOGY
SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
KATTANKULATHUR- 603 203
MAY 2026 


        SRM INSTITUTE OF SCIENCE AND TECHNOLOGY KATTANKULATHUR – 603 203
BONAFIDE CERTIFICATE


Certified that Project report titled “TEAMMATE FINDER” is the bonafide work of “MD NAYAJ MONDAL  [RA2411003011072],  KRISHNA MAHESHWARI [RA2411003011091]” who carried out the 21CSC205P Database Management Systems mini project work under my supervision. 
























COURSE FACULTY	HEAD OF THE DEPARMENT
DESIGNATION
Department	PROFESSOR AND HEAD
Department

                                                                          
      
           


ABSTRACT
The rapid growth of collaborative learning and competitive technical activities such as hackathons, mini-projects, and competitive programming has increased the need for efficient team formation among students. However, identifying suitable teammates with matching skills, interests, and availability remains a major challenge. Existing communication methods are often informal, unstructured, and time-consuming.

The TeamMates Finder project is a database-driven system designed to address this problem by providing a structured platform exclusively for university students to find and collaborate with potential teammates. The system allows users to create profiles, list their skills, publish collaboration posts, send and manage requests, and receive notifications regarding team activities.

The backend of the system is implemented using MySQL, ensuring data integrity, consistency, and efficient querying through a well-normalized relational database design. The project demonstrates key Database Management System (DBMS) concepts such as ER modelling, relational schema design, constraints, DDL and DML commands, and transaction handling. This system aims to simplify team formation, improve collaboration efficiency, and enhance student participation in technical events.

















TABLE OF CONTENTS
Chapter No.	Title	Page no.
    ABSTRACT	3
1	1.1 Introduction
1.2 Motivation
1.3 Scope
1.4 Problem Statement
1.5 Project Requirements
1.6 Identification of Entity and Relationships
1.7 Construction of DB Using ER Model for the “TeamMates Finder”.
    7-9
2	2.1 Relational Schemas
2.2 Description of Tables
2.3 Creation of Database and Tables – DDL Commands
2.4 Insertion of Tuples into the Table – DML Commands	10-
3	3.1 Writing queries based on the concepts of Aggregate functions, constraints, sets	
    3.2 Writing complex queries based on subqueries, joins and views	
    3.3 Writing complex queries based on the concepts of functions, Triggers, Cursors and Exception Handling	
4	4.1 Analysing the pitfalls, identifying the dependencies, and applying Normalizations- 1NF, 2NF, 3NF	
    4.2 Analysing the pitfalls, identifying the dependencies, and applying Normalizations- 4NF, 5NF	
5	Implementation of concurrency control and recovery mechanisms.	
6	Front-end And Back-End Implementation code	
7	Results and Discussions	






LIST OF FIGURES
Figure No.	Name	Page no.
1	ER Diagram of TeamMates Finder	9
2	Relational Schema of TeamMates Finder	10
3		
4		
5		





















LIST OF TABLES
Figure No.	Name	Page no.
1	Users Table	13
2	Posts Table	13
3	Requests Table	13
4	Notifications Table	14
5	User_Skills Table	14
6	Post_Skills Table	14



















CHAPTER 1

PROBLEM UNDERSTANDING, IDENTIFICATION OF ENTITY AND RELATIONSHIPS, CONSTRUCTION OF DB USING ER MODEL FOR THE TEAMMATES FINDER

1.1	Introduction
In modern academic environments, students actively participate in hackathons, mini-projects, research work, and competitive programming. One major challenge faced by students is finding suitable teammates with the required skills, availability, and interests. Existing communication platforms are either informal or unstructured, making it difficult to discover collaborators efficiently.
The TeamMates Finder system is a database-driven application designed to help students find teammates for hackathons, projects, and competitions in a structured and reliable manner. The system stores user profiles, collaboration posts, skill sets, requests, and notifications using a relational database implemented in MySQL.

1.2	Motivation
The motivation behind developing TeamMates Finder is to:
•	Reduce the difficulty of forming teams for technical activities
•	Provide a centralized platform restricted to verified university students
•	Match users based on skills, interests, and requirements
•	Maintain transparency and accountability through ratings and request tracking

1.3	 Scope
The scope of the TeamMates Finder project includes:
•	Student profile management
•	Posting collaboration requirements
•	Requesting to join teams
•	Skill-based matching
•	Notification handling
•	Secure data storage using MySQL
The project focuses only on backend database design and query implementation.

1.4	 Problem Statement
To design and implement a relational database system that enables students to efficiently find and collaborate with suitable teammates for academic and technical activities by managing user profiles, posts, skills, requests, and notifications.

1.5	Project Requirements
Functional Requirements:
•	User registration and profile storage
•	Create and manage collaboration posts
•	Send and manage collaboration requests
•	Store user and post skill sets
•	Generate notifications for activities
Non-Functional Requirements:
•	Data integrity and consistency
•	Secure access using constraints
•	Scalability
•	Efficient querying

1.6	 Identification of Entity and Relationships
Entities Identified:
•	Users
•	Posts
•	Requests
•	Notifications
•	Skills
Relationships:
•	One user can create many posts
•	One post can receive many requests
•	One user can have many skills
•	One post can require many skills
•	Users can send and receive requests

1.7	 Construction of DB Using ER Model for the Teammates Finder
The ER model for TeamMates Finder represents entities such as Users, Posts, Requests, Notifications, and Skills along with their relationships. Primary keys uniquely identify records, and foreign keys establish relationships between tables

 

Figure 1: ER-Relational Diagram for TeamMates Finder



Chapter 2
Design of Relational Schemas, Creation of Database and Tables for TeamMates Finder
                  
2.1 Relational Schema for TeamMates Finder
The relational schema represents the logical structure of the database tables derived from the ER model. It shows primary keys, foreign keys, and relationships among tables such as Users, Posts, Requests, Notifications, User_Skills, and Post_Skills.

 
Figure 2: Relational Schema for TeamMates Finder


2.2 Description of Tables
This section lists all the tables used in the TeamMates Finder database along with their attributes, data types, sizes, and constraints.
USERS Table
•	user_id – INT, size 11, Primary Key, AUTO_INCREMENT, NOT NULL
•	name – VARCHAR, size 100, NOT NULL
•	email – VARCHAR, size 100, UNIQUE, NOT NULL, CHECK constraint (must end with @srmist.edu.in)
•	registration_no – VARCHAR, size 20, UNIQUE, NOT NULL
•	department – VARCHAR, size 50, NOT NULL
•	github_url – VARCHAR, size 255, NULL allowed
•	linkedin_url – VARCHAR, size 255, NULL allowed
•	avg_rating – FLOAT, default value 0.0
•	created_at – TIMESTAMP, default CURRENT_TIMESTAMP

POSTS Table
•	post_id – INT, size 11, Primary Key, AUTO_INCREMENT, NOT NULL
•	author_id – INT, size 11, Foreign Key referencing Users(user_id), NOT NULL
•	title – VARCHAR, size 150, NOT NULL
•	description – TEXT, NOT NULL
•	type – ENUM, values ('Hackathon', 'Personal Project', 'Competitive Programming'), NOT NULL
•	vacancies – INT, CHECK constraint (vacancies > 0)
•	status – ENUM, values ('Open', 'Closed'), default 'Open'
•	created_at – TIMESTAMP, default CURRENT_TIMESTAMP

REQUESTS Table
•	request_id – INT, size 11, Primary Key, AUTO_INCREMENT, NOT NULL
•	post_id – INT, size 11, Foreign Key referencing Posts(post_id), NOT NULL
•	sender_id – INT, size 11, Foreign Key referencing Users(user_id), NOT NULL
•	receiver_id – INT, size 11, Foreign Key referencing Users(user_id), NOT NULL
•	pitch_message – TEXT, NULL allowed
•	status – ENUM, values ('Pending', 'Accepted', 'Rejected'), default 'Pending'
•	sent_at – TIMESTAMP, default CURRENT_TIMESTAMP

NOTIFICATIONS Table
•	notification_id – INT, size 11, Primary Key, AUTO_INCREMENT, NOT NULL
•	recipient_id – INT, size 11, Foreign Key referencing Users(user_id), NOT NULL
•	sender_id – INT, size 11, Foreign Key referencing Users(user_id), NULL allowed
•	n_type – ENUM, values ('New_Request', 'Accepted', 'Ad_Closed', 'Rating_Received'), NOT NULL
•	content – VARCHAR, size 255, NOT NULL
•	is_read – BOOLEAN, default FALSE
•	created_at – TIMESTAMP, default CURRENT_TIMESTAMP

USER_SKILLS Table
•	user_id – INT, size 11, Foreign Key referencing Users(user_id), NOT NULL
•	skill_name – VARCHAR, size 50, NOT NULL
•	Composite Primary Key (user_id, skill_name)

POST_SKILLS Table
•	post_id – INT, size 11, Foreign Key referencing Posts(post_id), NOT NULL
•	skill_name – VARCHAR, size 50, NOT NULL
•	Composite Primary Key (post_id, skill_name)





2.3 Creation of Database and Tables - DDL Commands 
DDL Commands to create all the tables
Table 2.1: USERS
•	user_id (INT, PK)
•	name (VARCHAR(100), NOT NULL)
•	email (VARCHAR(100), UNIQUE, CHECK constraint)
•	registration_no (VARCHAR(20), UNIQUE)
•	department (VARCHAR(50))
•	github_url (VARCHAR(255))
•	linkedin_url (VARCHAR(255))
•	avg_rating (FLOAT)
•	created_at (TIMESTAMP)

Table 2.2: POSTS
•	post_id (INT, PK)
•	author_id (INT, FK → Users)
•	title (VARCHAR(150))
•	description (TEXT)
•	type (ENUM)
•	vacancies (INT)
•	status (ENUM)
•	created_at (TIMESTAMP)

Table 2.3: REQUESTS
•	request_id (INT, PK)
•	post_id (INT, FK → Posts)
•	sender_id (INT, FK → Users)
•	receiver_id (INT, FK → Users)
•	pitch_message (TEXT)
•	status (ENUM)
•	sent_at (TIMESTAMP)

Table 2.4: NOTIFICATIONS
•	notification_id (INT, PK)
•	recipient_id (INT, FK → Users)
•	sender_id (INT, FK → Users)
•	n_type (ENUM)
•	content (VARCHAR(255))
•	is_read (BOOLEAN)
•	created_at (TIMESTAMP)

Table 2.5: USER_SKILLS
•	user_id (INT, FK → Users)
•	skill_name (VARCHAR(50))

Table 2.6: POST_SKILLS
•	post_id (INT, FK → Posts)
•	skill_name (VARCHAR(50))

2.4 Insertion of tuples into the table – DML commands
Insertion into USERS Table
Example: 
INSERT INTO Users (name, email, registration_no, department, github_url, linkedin_url, avg_rating) VALUES
 ('Md Nayaj Mondal', 'mn1234@srmist.edu.in', 'RA2411003010001', 'CSE', 'github.com/mdnm18', 'linkedin.com/in/md-nayaj', 4.8),('Krishna Sanjay', 'ks5678@srmist.edu.in', 'RA2411003010002', 'CSE', 'github.com/krishna', 'linkedin.com/in/krishna', 4.5),('Rahul Sharma', 'rs9012@srmist.edu.in', 'RA2411003010003', 'IT', 'github.com/rahul', 'linkedin.com/in/rahul', 4.2);
User_id	Name	Email	Reg_No	Dept	Github_url	Avg_rating
1	Md Nayaj Mondal	mn1234@srmist.edu.in	RA2411003010001	CSE	github.com/mdnm18	4.8
2	Krishna	ks5678@srmist.edu.in	RA2411003010002	CSE	github.com/krishna	4.5
3	Raghav	rs9012@srmist.edu.in	RA2411003010003	ECE	github.com/rahul	4.2

INSERT INTO User_Skills (user_id, skill_name) VALUES 
(1, 'React'), (1, 'Node.js'), (1, 'MongoDB'),
(2, 'Python'), (2, 'Machine Learning'), (2, 'C++'),
(3, 'Java'), (3, 'Spring Boot'), (3, 'MySQL');
User_id	Skill_name

1	React
1	Node.js
1	MongoDB
2	Python
2	Machine Learning
2	C++
3	Java
3	Spring Boot
3	MySql

Insertion into POSTS Table
INSERT INTO Posts (author_id, title, description, type, vacancies, status) VALUES 
(1, 'Hackathon Team for Smart India Hackathon', 'Looking for a backend dev and AI specialist.', 'Hackathon', 2, 'Open'),
(2, 'Competitive Programming Partner', 'Need a partner for CodeForces rounds (Rating 1200+).', 'Competitive Programming', 1, 'Open');



post_id	author_id	title	description	type	vacancies	status
1	1	Hackathon Team for Smart India Hackathon	Looking for a backend dev and AI specialist.	Hackathon	2	Open
2	2	Competitive Programming Partner	Need a partner for CodeForces rounds (Rating 1200+).	Competitive Programming	1	Open

Insertion into POST_SKILLS Table
INSERT INTO Post_Skills (post_id, skill_name) VALUES 
(1, 'Python'), (1, 'TensorFlow'), (1, 'Node.js'),(2, 'C++'), (2, 'Algorithms');
Post_id	Skill_name
1	Python
1	TensorFlow
1	Node.js
2	C++
2	Algoritms

Insertion into REQUESTS Table
INSERT INTO Requests (post_id, sender_id, receiver_id, pitch_message, status) VALUES 
(1, 3, 1, 'I am good with Spring Boot and can handle the backend integration.', 'Pending');
Request_id	Post_id	Sender_id	Receiver_id	Pitch_message	Status
1	1	3	1	I am good with Spring Boot and can handle the backend integration.	Pending

Insertion into NOTIFICATIONS Table
INSERT INTO Notifications (recipient_id, sender_id, n_type, content, is_read) VALUES 
(1, 3, 'New_Request', 'Rahul Sharma sent you a request for Smart India Hackathon.', FALSE);

Notification_id	Receiptent_id	Sender_id	N_type	content	Is_read
1	1	3	New_Request	Rahul Sharma sent you a request for Smart India Hackathon.	FALSE

























CHAPTER 3
Complex queries based on the concepts of constraints, sets, joins, views, Triggers and Cursors and Exception Handling

This chapter demonstrates complex SQL queries developed for the TeamMates Finder database. All queries are executed on the six relational tables: Users, Posts, Requests, Notifications, User_Skills, and Post_Skills. A minimum of three questions with queries are provided for every sub-topic as required.

3.1	Adding Constraints and queries based on constraints
Constraints enforce data integrity rules on columns and tables. The following queries demonstrate how constraints such as CHECK, UNIQUE, and FOREIGN KEY operate in the TeamMates Finder system.
Question: Display all users who have an average rating of 4.0 or above, ensuring only verified SRM institutional email addresses are listed.
SQL Statement: 
  SELECT user_id, name, email, avg_rating
  FROM Users
  WHERE avg_rating >= 4.0
  AND email LIKE '%@srmist.edu.in';
Output:
user_id	name	email	avg_rating
1	Md Nayaj Mondal	mn1234@srmist.edu.in	4.8
2	Krishna Maheshwari	km5678@srmist.edu.in	4.5
4	Priya Iyer	pi3456@srmist.edu.in	4.6

Question: Find all collaboration posts where the vacancy count is greater than 0 and status is 'Open', enforcing the CHECK constraint on vacancies.

SQL Statement: 
SELECT post_id, title, type, vacancies, status
FROM Posts
WHERE vacancies > 0 AND status = 'Open';
Output:
post_id	title	type	vacancies	status
1	Hackathon Team for Smart India Hackathon	Hackathon	2	Open
2	Competitive Programming Partner	Competitive Programming	1	Open
3	UI/UX Designer for Personal Project	Personal Project	1	Open

Question: Retrieve all pending collaboration requests with sender name, receiver name, and the post title, demonstrating referential integrity through FOREIGN KEY constraints.
SQL Statement:
SELECT r.request_id, s.name AS sender, rv.name AS receiver,
       p.title AS post_title, r.status
FROM Requests r
JOIN Users s  ON r.sender_id   = s.user_id
JOIN Users rv ON r.receiver_id = rv.user_id
JOIN Posts p  ON r.post_id     = p.post_id
WHERE r.status = 'Pending';
Output:
request_id	sender	receiver	post_title	status
1	Raghav Sharma	Md Nayaj Mondal	Hackathon Team for Smart India Hackathon	Pending
3	Md Nayaj Mondal	Priya Iyer	UI/UX Designer for Personal Project	Pending




3.2	Queries based on Aggregate Functions
Aggregate functions summarize data across multiple rows and return a single value. The following queries use aggregate functions on the TeamMates Finder database.
Question: Find the total number of collaboration posts created by each user.
SQL Statement:
SELECT u.user_id, u.name, COUNT(p.post_id) AS total_posts
FROM Users u
LEFT JOIN Posts p ON u.user_id = p.author_id
GROUP BY u.user_id, u.name
ORDER BY total_posts DESC;
Output:
user_id	name	total_posts
1	Md Nayaj Mondal	2
4	Priya Iyer	1
2	Krishna Maheshwari	1
3	Raghav Sharma	0
5	Arjun Mehta	0

Question: Calculate the average rating, maximum rating, and minimum rating of all users on the platform.
SQL Statement:
SELECT ROUND(AVG(avg_rating), 2) AS avg_platform_rating,
       MAX(avg_rating)           AS highest_rating,
       MIN(avg_rating)           AS lowest_rating
FROM Users;
Output:
avg_platform_rating	highest_rating	lowest_rating
4.42	4.8	4.0

Question: Count the number of requests received per post and display only those posts with more than zero requests.
SQL Statement:
   SELECT p.post_id, p.title, COUNT(r.request_id) AS total_requests
FROM Posts p
LEFT JOIN Requests r ON p.post_id = r.post_id
GROUP BY p.post_id, p.title
HAVING COUNT(r.request_id) > 0;
Output:
post_id	title	total_requests
1	Hackathon Team for Smart India Hackathon	2
3	UI/UX Designer for Personal Project	1

3.3	Complex queries based on Sets
Set operations combine results of two or more SELECT queries. The following queries use UNION, INTERSECT (workaround), and MINUS (workaround).
Question: Retrieve a combined list of all user IDs who have either created a post OR sent a collaboration request (UNION).
SQL Statement:
SELECT author_id AS user_id FROM Posts
UNION
SELECT sender_id AS user_id FROM Requests;
Output:
user_id
1
2
3
4

Question: Find users who have both published a post AND have skills listed on the platform (INTERSECT workaround).

SQL Statement:
SELECT DISTINCT u.user_id, u.name
FROM Users u
WHERE u.user_id IN (SELECT author_id FROM Posts)
AND u.user_id IN (SELECT user_id FROM User_Skills);
Output:
user_id	name
1	Md Nayaj Mondal
2	Krishna Maheshwari
4	Priya Iyer

Question: Find users who have created posts but have NOT sent any collaboration request to others (MINUS workaround).
SQL Statement:
SELECT DISTINCT author_id AS user_id
FROM Posts
WHERE author_id NOT IN (SELECT sender_id FROM Requests);
Output:
user_id
2
4

3.4	Complex queries based on Subqueries
Subqueries are SQL queries nested within another query. They allow dynamic filtering    and computation using results from one query inside another.
Question: Find all users whose average rating is higher than the overall platform average rating.
SQL Statement:
SELECT user_id, name, avg_rating
FROM Users
WHERE avg_rating > (SELECT AVG(avg_rating) FROM Users);
Output:
user_id	name	avg_rating
1	Md Nayaj Mondal	4.8
2	Krishna Maheshwari	4.5
4	Priya Iyer	4.6

Question:  Retrieve all posts that have received at least one 'Accepted' collaboration request.
SQL Statement:
SELECT post_id, title, type
FROM Posts
WHERE post_id IN (
    SELECT DISTINCT post_id FROM Requests WHERE status = 'Accepted'
);
Output:
post_id	title	type
1	Hackathon Team for Smart India Hackathon	Hackathon

Question: Find users who have NOT yet received any notification on the platform.
SQL Statement:
SELECT user_id, name, email
FROM Users
WHERE user_id NOT IN (
    SELECT DISTINCT recipient_id FROM Notifications
);
Output:
user_id	name	email
3	Raghav Sharma	rs9012@srmist.edu.in
5	Arjun Mehta	am7890@srmist.edu.in

3.5	Complex queries based on Joins
JOIN operations combine rows from two or more tables based on a related column. The     following queries demonstrate INNER JOIN, LEFT JOIN, and multi-table JOIN on the TeamMates Finder database.

Question: Retrieve complete details of all collaboration posts along with the author's name and department (INNER JOIN).
SQL Statement:
SELECT p.post_id, p.title, p.type, p.vacancies,
       p.status, u.name AS author_name, u.department
FROM Posts p
INNER JOIN Users u ON p.author_id = u.user_id;
Output:
post_id	title	type	vacancies	status	author	dept
1	Hackathon Team for SIH	Hackathon	2	Open	Md Nayaj Mondal	CSE
2	Competitive Programming Partner	Competitive Prog.	1	Open	Krishna Maheshwari	CSE
3	UI/UX Designer for Personal Project	Personal Project	1	Open	Priya Iyer	IT
4	ML Research Project Team	Personal Project	2	Closed	Md Nayaj Mondal	CSE

Question: List all users along with their collaboration posts. Include users who have not created any post (LEFT JOIN).
SQL Statement:
SELECT u.user_id, u.name, p.post_id, p.title
FROM Users u
LEFT JOIN Posts p ON u.user_id = p.author_id;







Output:
user_id	name	post_id	title
1	Md Nayaj Mondal	1	Hackathon Team for Smart India Hackathon
1	Md Nayaj Mondal	4	ML Research Project Team
2	Krishna Maheshwari	2	Competitive Programming Partner
3	Raghav Sharma	NULL	NULL
4	Priya Iyer	3	UI/UX Designer for Personal Project
5	Arjun Mehta	NULL	NULL

Question: Show all collaboration requests along with sender name, receiver name, and post title using multiple JOINs.
SQL Statement:
SELECT r.request_id,
       s.name  AS sender,
       rv.name AS receiver,
       p.title AS post_title,
       r.status
FROM Requests r
JOIN Users s  ON r.sender_id   = s.user_id
JOIN Users rv ON r.receiver_id = rv.user_id
JOIN Posts p  ON r.post_id     = p.post_id;
Output:
req_id	sender	receiver	post_title	status
1	Raghav Sharma	Md Nayaj Mondal	Hackathon Team for Smart India Hackathon	Pending
2	Krishna Maheshwari	Md Nayaj Mondal	Hackathon Team for Smart India Hackathon	Accepted
3	Md Nayaj Mondal	Priya Iyer	UI/UX Designer for Personal Project	Pending



3.6	Complex queries based on views
A view is a virtual table based on a stored SQL query. Views simplify complex queries  and provide abstraction for data access in the TeamMates Finder system.
Question: Create a view that shows all open posts along with the author's name and the required skills for each post.
SQL Statement:
CREATE VIEW Open_Posts_With_Skills AS
SELECT p.post_id, p.title, p.type, p.vacancies,
       u.name AS author_name,
       GROUP_CONCAT(ps.skill_name SEPARATOR ', ') AS required_skills
FROM Posts p
JOIN Users u        ON p.author_id = u.user_id
JOIN Post_Skills ps ON p.post_id   = ps.post_id
WHERE p.status = 'Open'
GROUP BY p.post_id, p.title, p.type, p.vacancies, u.name;
   SELECT * FROM Open_Posts_With_Skills;
Output:
post_id	title	type	vacancies	author_name	required_skills
1	Hackathon Team for SIH	Hackathon	2	Md Nayaj Mondal	Python, TensorFlow, Node.js
2	Competitive Programming Partner	Competitive Prog.	1	Krishna Maheshwari	C++, Algorithms
3	UI/UX Designer for Personal Project	Personal Project	1	Priya Iyer	Figma, React

Question: Create a view that displays the unread notification inbox of each user.
SQL Statement:
CREATE VIEW User_Notification_Inbox AS
SELECT n.notification_id,
       u.name AS recipient_name,
       n.n_type,
       n.content,
       n.created_at
FROM Notifications n
JOIN Users u ON n.recipient_id = u.user_id
WHERE n.is_read = FALSE;
   SELECT * FROM User_Notification_Inbox;
Output:
notif_id	recipient_name	n_type	content	created_at
1	Md Nayaj Mondal	New_Request	Raghav Sharma sent you a request for Smart India Hackathon.	2025-01-20 10:30:00
2	Md Nayaj Mondal	Accepted	Your request from Krishna Maheshwari has been accepted.	2025-01-20 11:00:00
3	Priya Iyer	New_Request	Md Nayaj Mondal sent you a request for UI/UX Designer post.	2025-01-20 11:30:00

Question: Create a view showing user profiles along with their total number of skills and total posts published.
SQL Statement:
CREATE VIEW User_Activity_Summary AS
SELECT u.user_id, u.name, u.department, u.avg_rating,
       COUNT(DISTINCT us.skill_name) AS total_skills,
       COUNT(DISTINCT p.post_id)     AS total_posts
FROM Users u
LEFT JOIN User_Skills us ON u.user_id = us.user_id
LEFT JOIN Posts p        ON u.user_id = p.author_id
GROUP BY u.user_id, u.name, u.department, u.avg_rating;

SELECT * FROM User_Activity_Summary;
Output:
user_id	name	department	avg_rating	total_skills	total_posts
1	Md Nayaj Mondal	CSE	4.8	3	2
2	Krishna Maheshwari	CSE	4.5	3	1
3	Raghav Sharma	ECE	4.2	3	0
4	Priya Iyer	IT	4.6	3	1
5	Arjun Mehta	CSE	4.0	3	0

 
4.1	Complex queries based on PL/SQL Functions
Functions are reusable stored programs that accept input parameters and return a single   computed value. The following functions are designed specifically for the TeamMates Finder system.
Question: Create a function that accepts a user_id and returns their average rating rounded to two decimal places.
SQL Statement:
DELIMITER $$
CREATE FUNCTION get_user_rating(p_user_id INT)
RETURNS DECIMAL(3,2)
DETERMINISTIC
BEGIN
    DECLARE v_rating DECIMAL(3,2);
    SELECT avg_rating INTO v_rating
    FROM Users WHERE user_id = p_user_id;
    RETURN ROUND(v_rating, 2);
END$$
DELIMITER ;
SELECT get_user_rating(1);
Output:
get_user_rating(1)
4.80

Question: Create a function that accepts a post_id and returns the total number of 'Pending' requests for that post.
SQL Statement:
DELIMITER $$
CREATE FUNCTION count_pending_requests(p_post_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM Requests
    WHERE post_id = p_post_id AND status = 'Pending';
    RETURN v_count;
END$$
DELIMITER ;
SELECT count_pending_requests(1);

Output:
count_pending_requests(1)
1

Question: Create a function that checks whether a specific user has a given skill and returns 'Yes' or 'No'.
SQL Statement:
DELIMITER $$
CREATE FUNCTION has_skill(p_user_id INT, p_skill VARCHAR(50))
RETURNS VARCHAR(3)
DETERMINISTIC
BEGIN
    DECLARE v_cnt INT;
    SELECT COUNT(*) INTO v_cnt
    FROM User_Skills
    WHERE user_id = p_user_id AND skill_name = p_skill;
    IF v_cnt > 0 THEN RETURN 'Yes';
    ELSE RETURN 'No';
    END IF;
END$$
DELIMITER ;
SELECT has_skill(1, 'React');
Output:
has_skill(1, 'React')
Yes

4.2	Complex queries based on Triggers
A trigger is a stored program that automatically executes in response to specific events (INSERT, UPDATE, DELETE) on a table. The following triggers automate business logic in the TeamMates Finder system.
Question: Create a BEFORE INSERT trigger that prevents a user from sending a collaboration request to their own post.
SQL Statement:
DELIMITER $$
CREATE TRIGGER before_insert_request
BEFORE INSERT ON Requests
FOR EACH ROW
BEGIN
    DECLARE v_author INT;
    SELECT author_id INTO v_author
    FROM Posts WHERE post_id = NEW.post_id;
    IF v_author = NEW.sender_id THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Cannot send request to your own post.';
    END IF;
END$$
DELIMITER ;
Output:
Result (on violation)
Error: Cannot send request to your own post.

Question:. Create an AFTER INSERT trigger that automatically inserts a notification when a new collaboration request is submitted.
SQL Statement:
DELIMITER $$
CREATE TRIGGER after_insert_request_notify
AFTER INSERT ON Requests
FOR EACH ROW
BEGIN
    DECLARE v_sender_name VARCHAR(100);
    DECLARE v_post_title  VARCHAR(150);
    SELECT name  INTO v_sender_name FROM Users WHERE user_id = NEW.sender_id;
    SELECT title INTO v_post_title  FROM Posts WHERE post_id = NEW.post_id;
    INSERT INTO Notifications (recipient_id, sender_id, n_type, content, is_read)
    VALUES (NEW.receiver_id, NEW.sender_id, 'New_Request',
            CONCAT(v_sender_name, ' sent you a request for ', v_post_title),
            FALSE);
END$$
DELIMITER ;



Output:
notification_id	recipient_id	sender_id	n_type	content	is_read
4	1	3	New_Request	Raghav Sharma sent you a request for Hackathon Team for SIH.	0

Question: Create an AFTER UPDATE trigger that logs every change to a post's status into an audit table called Post_Status_Log.
SQL Statement:
DELIMITER $$
CREATE TRIGGER after_update_post_status
AFTER UPDATE ON Posts
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO Post_Status_Log (post_id, old_status, new_status)
        VALUES (OLD.post_id, OLD.status, NEW.status);
    END IF;
END$$
DELIMITER ;

-- Activate the trigger:
UPDATE Posts SET status = 'Closed' WHERE post_id = 1;
Output:
log_id	post_id	old_status	new_status	changed_at
1	1	Open	Closed	2025-01-21 11:45:00


4.3	Complex queries based on Cursors
A cursor is a database object used to retrieve and process query results row by row. Cursors are used inside stored procedures when each row must be handled individually.
Question:. Write a stored procedure using an explicit cursor to display the name and average rating of all users, ordered by rating in descending order.
SQL Statement:
DELIMITER $$
CREATE PROCEDURE show_all_user_ratings()
BEGIN
    DECLARE done     INT DEFAULT 0;
    DECLARE v_name   VARCHAR(100);
    DECLARE v_rating FLOAT;
    DECLARE user_cursor CURSOR FOR
        SELECT name, avg_rating FROM Users ORDER BY avg_rating DESC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    OPEN user_cursor;
    read_loop: LOOP
        FETCH user_cursor INTO v_name, v_rating;
        IF done = 1 THEN LEAVE read_loop; END IF;
        SELECT v_name AS User_Name, v_rating AS Avg_Rating;
    END LOOP;
    CLOSE user_cursor;
END$$
DELIMITER ;

CALL show_all_user_ratings();
Output:
User_Name	Avg_Rating
Md Nayaj Mondal	4.8
Priya Iyer	4.6
Krishna Maheshwari	4.5
Raghav Sharma	4.2
Arjun Mehta	4.0

Question: Write a stored procedure using a cursor to list all open posts and print the title along with the number of pending requests for each.
SQL Statement:
DELIMITER $$
CREATE PROCEDURE list_open_posts_with_requests()
BEGIN
    DECLARE done        INT DEFAULT 0;
    DECLARE v_post_id   INT;
    DECLARE v_title     VARCHAR(150);
    DECLARE v_req_count INT;
    DECLARE post_cursor CURSOR FOR
        SELECT post_id, title FROM Posts WHERE status = 'Open';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    OPEN post_cursor;
    read_loop: LOOP
        FETCH post_cursor INTO v_post_id, v_title;
        IF done = 1 THEN LEAVE read_loop; END IF;
        SELECT COUNT(*) INTO v_req_count
        FROM Requests WHERE post_id = v_post_id AND status = 'Pending';
        SELECT v_title AS Post_Title, v_req_count AS Pending_Requests;
    END LOOP;
    CLOSE post_cursor;
END$$
DELIMITER ;

CALL list_open_posts_with_requests();
Output:
Post_Title	Pending_Requests
Hackathon Team for Smart India Hackathon	1
Competitive Programming Partner	0
UI/UX Designer for Personal Project	1

Question: Write a stored procedure using a cursor to display each user along with all their listed skills on the platform.
SQL Statement:
DELIMITER $$
CREATE PROCEDURE show_user_skills()
BEGIN
    DECLARE done       INT DEFAULT 0;
    DECLARE v_name     VARCHAR(100);
    DECLARE v_skill    VARCHAR(50);
    DECLARE skill_cursor CURSOR FOR
        SELECT u.name, us.skill_name
        FROM Users u
        JOIN User_Skills us ON u.user_id = us.user_id
        ORDER BY u.user_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    OPEN skill_cursor;
    read_loop: LOOP
        FETCH skill_cursor INTO v_name, v_skill;
        IF done = 1 THEN LEAVE read_loop; END IF;
        SELECT v_name AS User_Name, v_skill AS Skill;
    END LOOP;
    CLOSE skill_cursor;
END$$
DELIMITER ;

CALL show_user_skills();
Output:
User_Name	Skill
Md Nayaj Mondal	React
Md Nayaj Mondal	Node.js
Md Nayaj Mondal	MySQL
Krishna Maheshwari	Python
Krishna Maheshwari	Machine Learning
...	...

4.4	Complex queries based on Exception Handling
Exception handling in MySQL PL/SQL allows stored procedures to manage runtime errors gracefully using DECLARE HANDLER statements, preventing abrupt termination and providing meaningful messages to the user.
Question: Write a stored procedure to insert a new user. Handle the duplicate entry error (error code 1062) gracefully.
SQL Statement:
DELIMITER $$
CREATE PROCEDURE insert_new_user(
    IN p_name   VARCHAR(100),
    IN p_email  VARCHAR(100),
    IN p_reg_no VARCHAR(20),
    IN p_dept   VARCHAR(50)
)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SELECT 'Error: A user with this email or registration number already exists.' AS Message;
    END;
    INSERT INTO Users (name, email, registration_no, department)
    VALUES (p_name, p_email, p_reg_no, p_dept);
    SELECT 'User registered successfully.' AS Message;
END$$
DELIMITER ;

-- First call (success):
CALL insert_new_user('Arjun Test','at001@srmist.edu.in','RA0000000001','CSE');
-- Second call (duplicate):
CALL insert_new_user('Arjun Test','at001@srmist.edu.in','RA0000000001','CSE');
Output:
Call	Message
First Call	User registered successfully.
Second Call	Error: A user with this email or registration number already exists.

Question: Write a procedure to accept a collaboration request. Handle the case where the request_id does not exist using a NOT FOUND handler.
SQL Statement:
DELIMITER $$
CREATE PROCEDURE accept_request(IN p_request_id INT)
BEGIN
    DECLARE v_status    VARCHAR(10);
    DECLARE v_not_found INT DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_not_found = 1;
    SELECT status INTO v_status
    FROM Requests WHERE request_id = p_request_id;
    IF v_not_found = 1 THEN
        SELECT 'Error: Request not found.' AS Message;
    ELSEIF v_status = 'Accepted' THEN
        SELECT 'Error: Request is already accepted.' AS Message;
    ELSE
        UPDATE Requests SET status = 'Accepted'
        WHERE request_id = p_request_id;
        SELECT 'Request accepted successfully.' AS Message;
    END IF;
END$$
DELIMITER ;

CALL accept_request(1);   -- valid
CALL accept_request(999); -- does not exist
Output:
Call	Message
CALL accept_request(1)	Request accepted successfully.
CALL accept_request(999)	Error: Request not found.
Question: Write a procedure that deletes a post and all its associated data within a transaction. Handle any SQL exception and rollback if an error occurs.
SQL Statement:
DELIMITER $$
CREATE PROCEDURE delete_post_safely(IN p_post_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error: Transaction rolled back. Post deletion failed.' AS Message;
    END;
    START TRANSACTION;
    DELETE FROM Post_Skills  WHERE post_id = p_post_id;
    DELETE FROM Requests     WHERE post_id = p_post_id;
    DELETE FROM Notifications
        WHERE content LIKE CONCAT('%',(SELECT title FROM Posts WHERE post_id = p_post_id),'%');
    DELETE FROM Posts        WHERE post_id = p_post_id;
    COMMIT;
    SELECT 'Post and all associated data deleted successfully.' AS Message;
END$$
DELIMITER ;

CALL delete_post_safely(2);
Output:
Result	Message
Success	Post and all associated data deleted successfully.
On Error	Error: Transaction rolled back. Post deletion failed.








CHAPTER 4 

ANALYZING THE PITFALLS, IDENTIFYING THE DEPENDENCIES, AND APPLYING NORMALIZATIONS

4.1 Analyse the Pitfalls in Relations 
Before normalization, consider a single unnormalized table that attempts to store all TeamMates Finder data in one place:
Table 4.0: Unnormalized TeamMates Finder Table (UNF)
user_id	user_name	email	dept	skills	post_title	post_type	req_sender	req_status
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE	React, Node.js	Hackathon Team for SIH	Hackathon	Raghav Sharma	Pending
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE	React, Node.js	Hackathon Team for SIH	Hackathon	Krishna Maheshwari	Accepted
2	Krishna Maheshwari	km5678@srmist.edu.in	CSE	Python, ML	Competitive Programming Partner	Competitive	—	—
4	Priya Iyer	pi3456@srmist.edu.in	IT	UI/UX, Figma	UI/UX Designer for Personal Project	Personal	Md Nayaj Mondal	Pending
                                
                                
                                
                                
                                

Pitfalls identified in this unnormalized table:
•	Insertion Anomaly — Cannot add a new user without also adding a post and request. A user with no post yet cannot be stored.
•	Update Anomaly — If Nayaj changes his email, it must be updated in every row where he appears. Missing one row causes inconsistency.
•	Deletion Anomaly — If Priya's request is deleted, all of Priya's user information is also lost.
•	Data Redundancy — Nayaj's name, email, department, and skills are repeated in multiple rows because he has multiple requests on his post.
•	Multi-valued attribute — The 'skills' column stores 'React, Node.js, MySQL' in one cell, violating the atomic value rule.

4.2 First Normal Form
A table is in First Normal Form (1NF) if every column contains atomic (indivisible) values, there are no repeating groups, and each row is uniquely identifiable.

4.2.1: Identify Dependency 
Violation in UNF table:
•	The 'skills' column contains multiple values in a single cell: 'React, Node.js, MySQL'. This is a multi-valued attribute — not atomic.
•	There is no single column or set of columns that uniquely identifies each row.
•	Repeating groups exist — user data is repeated for each request.

4.2.2: Apply Normalization to 1NF
To convert to 1NF: separate multi-valued attributes into individual rows and ensure every cell contains exactly one value.
user_id	user_name	email	dept	skill	post_title	post_type	req_sender	req_status
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE	React	Hackathon Team for SIH	Hackathon	Raghav Sharma	Pending
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE	Node.js	Hackathon Team for SIH	Hackathon	Raghav Sharma	Pending
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE	React	Hackathon Team for SIH	Hackathon	Krishna M.	Accepted
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE	Node.js	Hackathon Team for SIH	Hackathon	Krishna M.	Accepted
2	Krishna Maheshwari	km5678@srmist.edu.in	CSE	Python	Competitive Programming Partner	Competitive	—	—
2	Krishna Maheshwari	km5678@srmist.edu.in	CSE	ML	Competitive Programming Partner	Competitive	—	—
4	Priya Iyer	pi3456@srmist.edu.in	IT	UI/UX	UI/UX Designer for Personal Project	Personal	Md Nayaj Mondal	Pending
4	Priya Iyer	pi3456@srmist.edu.in	IT	Figma	UI/UX Designer for Personal Project	Personal	Md Nayaj Mondal	Pending

The table is now in 1NF — every cell contains exactly one atomic value. However, massive redundancy still exists. Nayaj's data repeats for every skill and every request combination. This leads to 2NF.

4.3 Second Normal Form
A table is in Second Normal Form (2NF) if it is already in 1NF and every non-key attribute is fully functionally dependent on the entire primary key. Partial dependencies — where a non-key attribute depends on only part of a composite primary key — must be removed.
4.3.1: Identify Dependency
In the 1NF table, assume a composite primary key of (user_id, skill, req_sender).
•	user_name, email, dept depend only on user_id — partial dependency on part of the composite key.
•	post_title, post_type depend on the post, not on the full composite key.
•	req_status depends on req_sender and the post — not on user_id or skill alone.
•	These partial dependencies violate 2NF.

4.3.2: Apply Normalization to 2NF
Remove partial dependencies by splitting the table. Each non-key attribute must depend on the whole primary key of its table.
Table 4.2a: USERS (after 2NF)
user_id (PK)	user_name	email	dept
1	Md Nayaj Mondal	mn1234@srmist.edu.in	CSE
2	Krishna Maheshwari	km5678@srmist.edu.in	CSE
3	Raghav Sharma	rs9012@srmist.edu.in	ECE
4	Priya Iyer	pi3456@srmist.edu.in	IT
5	Arjun Mehta	am7890@srmist.edu.in	CSE

Table 4.2b: USER_SKILLS (after 2NF)
user_id (FK)	skill_name
1	React
1	Node.js
1	MySQL
2	Python
2	Machine Learning

Table 4.2c: POSTS (after 2NF)
post_id (PK)	author_id (FK)	post_title	post_type	vacancies	status
1	1	Hackathon Team for Smart India Hackathon	Hackathon	2	Open
2	2	Competitive Programming Partner	Competitive Programming	1	Open
3	4	UI/UX Designer for Personal Project	Personal Project	1	Open

Table 4.2d: REQUESTS (after 2NF)
request_id (PK)	post_id (FK)	sender_id (FK)	receiver_id (FK)	status
1	1	3	1	Pending
2	1	2	1	Accepted
3	3	1	4	Pending

The table is now in 2NF — all non-key attributes are fully dependent on the entire primary key of their respective tables. However, transitive dependencies may still exist. This leads to 3NF.

4.4 Third Normal Form
A table is in Third Normal Form (3NF) if it is already in 2NF and no non-key attribute is transitively dependent on the primary key — meaning no non-key attribute should depend on another non-key attribute.

4.4.1: Identify Dependency
Consider the USERS table from 2NF:
•	user_id → dept (user determines department — OK)
•	user_id → avg_rating (user determines rating — OK)
Now consider if we had stored dept_head in the Users table:
•	user_id → dept → dept_head
•	dept_head depends on dept, not directly on user_id. This is a transitive dependency.
•	In our current design, this is avoided by not storing department details in the Users table. But the avg_rating itself could become a transitive dependency if it were derived from individual ratings stored separately.

4.4.2: Apply Normalization to 3NF
Our existing table structure already satisfies 3NF. To demonstrate the concept with a concrete example, consider an extended Users table with department head information:
Table 4.3a: Extended Users — NOT in 3NF (transitive dependency)
user_id	user_name	dept	dept_head
1	Md Nayaj Mondal	CSE	Dr. Karthikeyan
2	Krishna Maheshwari	CSE	Dr. Karthikeyan
3	Raghav Sharma	ECE	Dr. Ramesh
4	Priya Iyer	IT	Dr. Lakshmi
5	Arjun Mehta	CSE	Dr. Karthikeyan

Transitive dependency: user_id → dept → dept_head




Table 4.3b: USERS — After 3NF
user_id (PK)	user_name	dept (FK)	avg_rating
1	Md Nayaj Mondal	CSE	4.8
2	Krishna Maheshwari	CSE	4.5
3	Raghav Sharma	ECE	4.2
4	Priya Iyer	IT	4.6
5	Arjun Mehta	CSE	4.0

Table 4.3c: DEPARTMENT — After 3NF (transitive dependency removed)
dept (PK)	dept_head
CSE	Dr. Karthikeyan
ECE	Dr. Ramesh
IT	Dr. Lakshmi

The table is now in 3NF — dept_head is moved to a separate DEPARTMENT table where it depends directly on its own primary key (dept). No transitive dependencies remain in any table.

4.5	BCNF 
A table is in BCNF if it is in 3NF and for every functional dependency X → Y, X must be 
a superkey (a key that uniquely identifies a row). BCNF is a stricter version of 3NF that handles edge cases where 3NF still allows anomalies.

4.5.1: Identify Dependency
Consider the POST_SKILLS table:
•	Primary Key: (post_id, skill_name)
•	post_id → author_id (if author_id were stored here — the post determines who created it)
•	If author_id were stored in Post_Skills, then author_id would depend on post_id alone, not on the full composite key. This would violate BCNF.
•	In our current design, Post_Skills only stores (post_id, skill_name) — no such violation exists. Our schema already satisfies BCNF.

4.5.2: Apply Normalization to BCNF 
To demonstrate BCNF with a concrete example, consider a hypothetical table where a skill has a preferred tool associated with it per post:
Table 4.4a: POST_SKILLS_EXTENDED — NOT in BCNF
post_id	skill_name	preferred_tool	tool_vendor
1	Python	PyCharm	JetBrains
1	Node.js	VS Code	Microsoft
2	C++	CLion	JetBrains
3	React	VS Code	Microsoft

preferred_tool → tool_vendor (tool determines vendor, but preferred_tool is not a superkey). This violates BCNF.
Table 4.4b: POST_SKILLS — After BCNF
post_id (PK)	skill_name (PK)	preferred_tool
1	Python	PyCharm
1	Node.js	VS Code
2	C++	CLion
3	React	VS Code

Table 4.4c: TOOL_VENDOR — After BCNF (dependency removed)
preferred_tool (PK)	tool_vendor
PyCharm	JetBrains
VS Code	Microsoft
CLion	JetBrains

After BCNF normalization, every determinant in every table is a superkey. The tool_vendor dependency is moved to its own table where preferred_tool is the primary key.

4.6	Fourth Normal Form
A table is in Fourth Normal Form (4NF) if it is in BCNF and contains no non-trivial multi-valued dependencies (MVD). A multi-valued dependency exists when one attribute independently determines multiple values of two other attributes, causing unnecessary row multiplication.

4.6.1: Identify Dependency
Consider the following situation — if we had stored user skills and user posts together in one combined table in the TeamMates Finder database:
Table 4.5a: USER_SKILLS_POSTS — NOT in 4NF
user_id	skill_name	post_id
1	React	1
1	React	4
1	Node.js	1
1	Node.js	4
1	MySQL	1
1	MySQL	4

•	user_id →→ skill_name (user independently determines their skills)
•	user_id →→ post_id (user independently determines their posts)
•	Skills and posts are independent of each other but both depend on user_id.
•	This causes every skill to be repeated for every post — massive redundancy.
•	This is a multi-valued dependency (MVD) violation of 4NF.

4.6.2: Apply Normalization to 4NF
Separate each independent multi-valued dependency into its own table.


Table 4.5b: USER_SKILLS — After 4NF
user_id (PK, FK)	skill_name (PK)
1	React
1	Node.js
1	MySQL
2	Python
2	Machine Learning

Table 4.5c: USER_POSTS — After 4NF (user to post mapping)
user_id (PK, FK)	post_id (PK, FK)
1	1
1	4
2	2
4	3

After 4NF normalization, skills and posts are stored in separate tables. No row multiplication occurs. Each table contains exactly one independent multi-valued fact about the user. This matches the actual design of the TeamMates Finder database (User_Skills and Posts tables).

4.7	Fifth Normal Form
A table is in Fifth Normal Form (5NF) — also called Project-Join Normal Form (PJNF) — if it is in 4NF and cannot be decomposed further into smaller tables without losing information. It eliminates join dependencies that are not implied by candidate keys.

4.7.1: Identify Dependency
Consider a three-way relationship in TeamMates Finder — a user recommends a skill for a specific post:

Table 4.6a: USER_SKILL_POST_RECOMMENDATION — NOT in 5NF
user_id	skill_name	post_id
1	Python	1
1	Node.js	1
2	Python	1
2	Machine Learning	4
3	Java	2

•	This table represents a three-way relationship: a user recommends a skill for a post.
•	The relationship only makes sense when all three attributes are combined together.
•	You cannot split this into two-way tables and reconstruct it by joining without generating spurious (incorrect) rows.
•	This join dependency that cannot be implied by any key violates 5NF.

4.7.2: Apply Normalization to 5NF
Decompose into three binary (two-column) tables. Each table captures one aspect of the relationship. The original data can be reconstructed by joining all three without spurious rows.
Table 4.6b: USER_SKILL — After 5NF
user_id	skill_name
1	Python
1	Node.js
2	Python
2	Machine Learning
3	Java






Table 4.6c: SKILL_POST — After 5NF
skill_name	post_id
Python	1
Node.js	1
Python	1
Machine Learning	4
Java	2

Table 4.6d: USER_POST — After 5NF
user_id	post_id
1	1
2	1
2	4
3	2

After 5NF normalization, the three-way relationship is decomposed into three binary tables. The original data can be fully recovered by joining them back together. No spurious tuples are generated. This represents the highest level of normalization and corresponds to the actual table design of the TeamMates Finder database (User_Skills, Post_Skills, and Posts).











CHAPTER 5 
IMPLEMENTATION OF CONCURRENCY CONTROL AND RECOVERY MECHANISMS

5.1 Introduction to Transactions
A transaction is a sequence of one or more SQL operations that are treated as a single    logical unit of work. Either all operations in a transaction succeed and are committed, or if any operation fails, all changes are rolled back to maintain database consistency.

5.1.1 Properties
Property	Full Name	Description	TeamMates Finder Example
A	Atomicity	All operations in a transaction succeed or all are rolled back — no partial execution.	When a user sends a request and a notification must be created — both succeed or both fail.
C	Consistency	A transaction brings the database from one valid state to another, maintaining all rules and constraints.	After accepting a request, the status changes from Pending to Accepted — constraints always satisfied.
I	Isolation	Concurrent transactions do not interfere with each other — each sees a consistent view of data.	Two users sending requests to the same post simultaneously do not corrupt each other's data.
D	Durability	Once a transaction is committed, the changes are permanent even if the system crashes.	Once a post is closed and committed, it stays closed even after a server restart.

5.1.2 States
State	Description
Active	The transaction is currently executing its operations.
Partially Committed	The last statement has been executed but changes are not yet written to disk.
Committed	All changes have been successfully saved permanently to the database.
Failed	An error occurred during execution — the transaction cannot proceed.
Aborted	The transaction has been rolled back — the database is restored to its state before the transaction started.

5.2 Transaction Control Language (TCL)
TCL commands are used to manage transactions in the database — controlling when changes are permanently saved, when they are undone, and creating intermediate checkpoints.
Command	Purpose	Syntax
START TRANSACTION / BEGIN	Starts a new transaction block. Changes after this point are not permanent until COMMIT.	START TRANSACTION;  or  BEGIN;
COMMIT	Permanently saves all changes made since the last START TRANSACTION.	COMMIT;
ROLLBACK	Undoes all changes made since the last START TRANSACTION or last SAVEPOINT.	ROLLBACK;
SAVEPOINT	Creates a named checkpoint inside a transaction to which you can roll back partially.	SAVEPOINT savepoint_name;
ROLLBACK TO	Rolls back changes made after the specified savepoint, without cancelling the whole transaction.	ROLLBACK TO savepoint_name;
RELEASE SAVEPOINT	Removes a savepoint that is no longer needed.	RELEASE SAVEPOINT savepoint_name;

5.2.1 Save point
A SAVEPOINT creates a named checkpoint within an active transaction. If something goes wrong after the savepoint, you can roll back to that point without discarding all changes from the beginning of the transaction.

5.2.2 Commit
COMMIT permanently writes all changes made during the current transaction to the database. Once committed, changes cannot be undone using ROLLBACK. The transaction ends and a new one can begin.

5.2.3 Rollback
ROLLBACK undoes all changes made during the current transaction (or back to a specified SAVEPOINT) and returns the database to its previous consistent state. Used when an error is detected and changes must be discarded.

5.3 Transactions for TeamMates Finder
5.3.1 Transaction1 –User Registration with Rollback on Duplicate
Scenario: Register a new user. If the email already exists, roll back the transaction and show an error.

START TRANSACTION;
-- Step 1: Try to insert a new user
INSERT INTO Users (name, email, registration_no, department, avg_rating)
VALUES ('Sneha Patel', 'sp1111@srmist.edu.in', 'RA2411003010006', 'CSE', 0.0);

-- Step 2: Set a savepoint after insertion
SAVEPOINT after_user_insert;

-- Step 3: Insert skills for the new user
INSERT INTO User_Skills (user_id, skill_name)
VALUES (LAST_INSERT_ID(), 'Java'), (LAST_INSERT_ID(), 'Spring Boot');

-- Step 4: All looks good — commit everything
COMMIT;

SELECT 'Transaction 1: User registered successfully.' AS Result;



Output — Transaction 1
Result
Transaction 1: User registered successfully.

Rollback scenario — if duplicate email is inserted:
START TRANSACTION;
INSERT INTO Users (name, email, registration_no, department)
VALUES ('Duplicate User', 'mn1234@srmist.edu.in', 'RA9999', 'CSE');
-- Error 1062: Duplicate entry for email
ROLLBACK;
SELECT 'Transaction 1 Rolled Back: Email already exists.' AS Result;

Result
Transaction 1 Rolled Back: Email already exists.

5.3.2 Transaction 2 – Sending a Collaboration Request
Scenario: A user sends a request to join a post. Insert the request and let the trigger auto-create the notification. Use a savepoint before each step.

START TRANSACTION;
-- Step 1: Verify the post is still open
SELECT post_id, title, status FROM Posts WHERE post_id = 2 AND status = 'Open';

SAVEPOINT verify_post;
       -- Step 2: Insert the request (trigger auto-creates notification)
INSERT INTO Requests (post_id, sender_id, receiver_id, pitch_message, status)
VALUES (2, 5, 2, 'I have strong competitive programming skills.', 'Pending');

SAVEPOINT after_request;
-- Step 3: Verify notification was auto-created by trigger
SELECT * FROM Notifications WHERE recipient_id = 2 ORDER BY created_at DESC LIMIT 1;

-- Step 4: Commit the transaction
COMMIT;
SELECT 'Transaction 2: Request sent and notification created.' AS Result;

Output — Transaction 2
request_id	post_id	sender_id	receiver_id	pitch_message	status
4	2	5	2	I have strong competitive programming skills.	Pending

5.3.3 Transaction 3 – Accepting a Request and Closing a Post
Scenario: Post author accepts one request and closes the post. Both operations must succeed together — if post closure fails, the acceptance must also be rolled back.
START TRANSACTION;
-- Step 1: Accept the request
UPDATE Requests SET status = 'Accepted' WHERE request_id = 1;

SAVEPOINT after_accept;
-- Step 2: Reduce vacancies by 1
UPDATE Posts SET vacancies = vacancies - 1 WHERE post_id = 1;

SAVEPOINT after_vacancy_update;
-- Step 3: Check if post is now full (vacancies = 0)
-- If full, close the post
UPDATE Posts SET status = 'Closed'
WHERE post_id = 1 AND vacancies = 0;

-- Step 4: Insert acceptance notification
INSERT INTO Notifications (recipient_id, sender_id, n_type, content, is_read)
VALUES (3, 1, 'Accepted',
       'Your request for Hackathon Team for SIH has been accepted.', FALSE);

-- Step 5: Commit all changes
COMMIT;
SELECT 'Transaction 3: Request accepted and post updated.' AS Result;


Output — Transaction 3
Table	Change
Requests	request_id=1 status → Accepted
Posts	post_id=1 vacancies reduced, status → Closed if full
Notifications	New acceptance notification inserted for user 3
Post_Status_Log	Status change logged automatically by trigger

5.3.4 Transaction 4 – Safe Post Deletion with SAVEPOINT and ROLLBACK
Scenario: Delete a post and all its related data step by step. Use savepoints at each stage. If any step fails, rollback to a safe savepoint instead of losing all work.

START TRANSACTION;
-- Step 1: Delete post skills first (child records)
DELETE FROM Post_Skills WHERE post_id = 4;
SAVEPOINT after_skills_delete;

-- Step 2: Delete all requests for this post
DELETE FROM Requests WHERE post_id = 4;
SAVEPOINT after_requests_delete;

-- Step 3: Delete related notifications
DELETE FROM Notifications WHERE content LIKE '%ML Research Project%';
SAVEPOINT after_notifications_delete;

-- Step 4: Finally delete the post itself
DELETE FROM Posts WHERE post_id = 4;

-- Step 5: Verify deletion
SELECT COUNT(*) AS remaining FROM Posts WHERE post_id = 4;

-- Step 6: All successful — commit
COMMIT;
SELECT 'Transaction 4: Post and all related data deleted.' AS Result;


Output — Transaction 4 (Success)
remaining	Result
0	Transaction 4: Post and all related data deleted.

Rollback to savepoint scenario — if post deletion fails, rollback only the last step:
-- If DELETE FROM Posts fails due to remaining FK references:
ROLLBACK TO after_notifications_delete;
-- Notifications are re-inserted, requests and skills remain deleted
-- Investigate and fix, then retry
ROLLBACK; -- Full rollback if needed
SELECT 'Transaction 4 Rolled Back: Post deletion failed.' AS Result;

5.3.5 Transaction 5 – Rating Update with Validation
Scenario: Update a user's average rating after receiving a new rating. Validate the new rating is within range (0–5). If the new rating violates the range, rollback and keep the old value.

START TRANSACTION;
-- Step 1: Store current rating before update
SELECT avg_rating FROM Users WHERE user_id = 1;
-- Current: 4.8

SAVEPOINT before_rating_update;
-- Step 2: Update average rating
-- New rating received is 4.9, new average = (4.8 + 4.9) / 2 = 4.85
UPDATE Users SET avg_rating = 4.85 WHERE user_id = 1;

-- Step 3: Validate the new rating is within valid range
SELECT avg_rating INTO @new_rating FROM Users WHERE user_id = 1;

-- Step 4: If valid, commit. If not, rollback to savepoint.
-- Simulating validation check:
-- @new_rating = 4.85 which is between 0 and 5 — valid
COMMIT;
SELECT 'Transaction 5: Rating updated successfully.' AS Result,
       avg_rating AS New_Rating FROM Users WHERE user_id = 1;



Output — Transaction 5
Result	New_Rating
Transaction 5: Rating updated successfully.	4.85

Rollback scenario — invalid rating:
-- If rating calculation resulted in 5.5 (out of range):
ROLLBACK TO before_rating_update;
SELECT 'Transaction 5 Rolled Back: Rating out of valid range.' AS Result;

5.4 Concurrency control
5.4.1 Concurrency control Algorithms
5.4.1 Locking commands 
    a. Row-Level Locking – SELECT ... FOR UPDATE
    b. Table-Level Locking – LOCK TABLE
Lock Modes
Lock Mode	Description
ROW SHARE	Allows concurrent access; prevents other sessions from locking the table exclusively.
ROW EXCLUSIVE	Prevents other sessions from locking in share mode. Used by default for DML.
SHARE	Allows queries but not updates or deletes.
SHARE ROW EXCLUSIVE	A mix; more restrictive than SHARE.
EXCLUSIVE	Prevents all other access — full table lock.

       c. COMMIT – Release All Locks
       d. ROLLBACK – Undo Changes & Release Locks
 5.4.2 Example 
Scenario: Two users (User A and User B) simultaneously try to send requests to the same post (post_id = 2) which has only 1 vacancy. Concurrency control ensures only one request succeeds and the vacancy is correctly managed.

Table 5.1: Concurrent Transaction Execution
Step	Transaction 1 (User A — Arjun)	Transaction 2 (User B — Raghav)	Lock State
1	START TRANSACTION;	START TRANSACTION;	No locks held
2	SELECT * FROM Posts WHERE post_id=2 FOR UPDATE;	Waiting — row locked by T1	Row lock on post_id=2 held by T1
3	INSERT INTO Requests (post_id=2, sender_id=5, ...);	Still waiting	T1 holds row lock
4	UPDATE Posts SET vacancies=0 WHERE post_id=2;	Still waiting	T1 updates vacancies
5	COMMIT; -- releases row lock	Now executes: SELECT * FROM Posts WHERE post_id=2 FOR UPDATE;	T1 released, T2 acquires lock
6	Transaction 1 complete	Sees vacancies=0, decides not to send request	T2 holds lock
7	–	ROLLBACK; -- no request inserted	T2 released, no lock

SQL code for Transaction 1 — User A:
-- Transaction 1: Arjun sends a request (acquires row lock)
START TRANSACTION;

-- Acquire row-level lock on this post
SELECT * FROM Posts WHERE post_id = 2 FOR UPDATE;

-- Insert the request
INSERT INTO Requests (post_id, sender_id, receiver_id, pitch_message, status)
VALUES (2, 5, 2, 'I have algorithms expertise.', 'Pending');

-- Reduce vacancies
UPDATE Posts SET vacancies = vacancies - 1 WHERE post_id = 2;

-- Commit and release the row lock
COMMIT;
SELECT 'T1: Arjun request submitted successfully.' AS Result;

SQL code for Transaction 2 — User B:
-- Transaction 2: Raghav tries to send a request to the same post
START TRANSACTION;

-- Try to acquire row lock — BLOCKED until T1 commits
SELECT * FROM Posts WHERE post_id = 2 FOR UPDATE;

-- After T1 commits, T2 sees vacancies = 0
-- Decision: no vacancy available, do not insert request
SELECT vacancies FROM Posts WHERE post_id = 2;
-- Result: vacancies = 0

ROLLBACK;
SELECT 'T2: No vacancy available. Request not submitted.' AS Result;

Output — Concurrency Control Example
Transaction	Result
Transaction 1 (Arjun)	T1: Arjun request submitted successfully.
Transaction 2 (Raghav)	T2: No vacancy available. Request not submitted.
Posts table after both	post_id=2, vacancies=0, status='Open'
Requests table	Only Arjun's request inserted — no duplicate or ghost entry















CHAPTER 6
FRONT-END AND BACK-END CODE OF <PROJECT TITLE>

6.1 Front–End Module codes
6.2 Database connectivity





















CHAPTER 7
RESULTS AND DISCUSSIONS

7.1 Screenshots of front-end

7.2 Screenshots of Database




















References
