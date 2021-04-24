INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Operations");

INSERT INTO role (title, salary, department_id) -- manager_id = 1
VALUES ("Accounting Manager", 80000, 1);

INSERT INTO role (title, salary, department_id) -- 2
VALUES ("Senior Accountant", 750000, 1);

INSERT INTO role (title, salary, department_id) -- 3
VALUES ("Junior Accountant", 60000, 1);

INSERT INTO role (title, salary, department_id) -- manager_id = 4
VALUES ("HR Manager", 75000, 2);

INSERT INTO role (title, salary, department_id) -- 5
VALUES ("Recruiter", 60000, 2);

INSERT INTO role (title, salary, department_id) -- manager_id = 6
VALUES ("IT Manager", 100000, 3);

INSERT INTO role (title, salary, department_id) -- 7
VALUES ("Senior Web Developer", 80000, 3);

INSERT INTO role (title, salary, department_id) -- 8
VALUES ("Junior Web Developer", 60000, 3);

INSERT INTO role (title, salary, department_id) -- manager_id = 9
VALUES ("Sales Manager", 70000, 4);

INSERT INTO role (title, salary, department_id) -- 10
VALUES ("Sales Associate", 50000, 4);

INSERT INTO role (title, salary, department_id) -- manager_id = 11
VALUES ("Marketing Manager", 90000, 5);

INSERT INTO role (title, salary, department_id) -- 12
VALUES ("Digital Marketing Associate", 55000, 5);

INSERT INTO role (title, salary, department_id) -- 13
VALUES ("Marketing Intern", 35000, 5);

INSERT INTO role (title, salary, department_id) -- 14
VALUES ("CEO", 1000000, 6);

INSERT INTO role (title, salary, department_id) -- 15
VALUES ("VP", 900000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lucas", "Quatorze", 14);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vanessa", "Osorio", 15);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eduardo", "Ferrer", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Smith", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyrone", "Swoopes", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lynn", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jennifer", "Riley", 5, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Raul", "Stabler", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Nickolson", 7, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leo", "DiCaprio", 8, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 10, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Day", 11);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Sheen", 12, 11);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dikembe", "Mutombo", 13, 11);

