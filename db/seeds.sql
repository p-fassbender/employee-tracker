INSERT INTO department (name)
VALUES
    ('Administration'),
    ('Research'),
    ('Marketing'),
    ('Human Resources'),
    ('Customer Service'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Administrator', 100000, 1),               
    ('Administrative Assistant', 75000, 1),
    ('Investigator', 100000, 2),                
    ('Coordinator', 85000, 2),
    ('Chief Officer', 150000, 3),               
    ('Creative Director', 100000, 3),           
    ('Content Specialist', 95000, 3),           
    ('Recruiter', 70000, 4),
    ('Call Center Agent', 65000, 5),            
    ('Support Representative', 65000, 5),
    ('Bookkeeper', 110000, 6),                  
    ('Accountant', 130000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sam', 'Sprang', 10, NULL),
    ('Blake', 'Gonring', 12, NULL),
    ('Nick', 'Larson', 12, 2),
    ('Heidi', 'Douglas', 9, NULL),
    ('Melissa', 'Allen', 1, NULL),
    ('Tim', 'Gundrum', 1, 5),
    ('Shawn', 'Verbrink', 1, 5),
    ('Tracy', 'Lewandowski', 2, 7),
    ('Tara', 'Pierce', 8, NULL),
    ('Jim', 'Ball', 3, NULL),
    ('Jared', 'Stahl', 4, 10),
    ('Paul', 'McMahon', 5, NULL),
    ('Lisa', 'Mercy', 6, 12),
    ('Cory', 'Killian', 7, 12),
    ('Dallas', 'Bezzer', 10, NULL),
    ('Ethan', 'Morgan', 11, 2);