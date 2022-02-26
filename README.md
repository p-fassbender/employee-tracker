# Employee Tracker

The aim of this project was to create an interactive command line interface be able to view and manage the departments, roles, and employees in a company database

## Table of Contents
[Technologies Used](#technologies-used) <br>
[Installation](#installation) <br>
[Usage](#use) <br>
[Testing](#tests) <br>
[Media](#media) <br>
[Questions](#questions) <br>

## Technologies Used
* JavaScript
* Node.js
* Inquirer
* SQL

---

## Installation
Navigate to the root directory in the terminal and initialize the project with **npm install** to install all the proper node module dependencies. </br>
Navigate to the root directory in the terminal and log into mysql with **mysql -u &lt;user> -p** and enter your mysql password. </br>
Initialize the database and tables in mysql using the following commands
* **source db/db.sql**
* **source db/schema.sql**
* **source db/seeds.sql**

---

## Use
Navigate to the root directory in the terminal and type **npm start** to run the project

---

## Tests
There are no formal tests for this project

---

## Media
insert video link here

insert screenshot here

The following link is to this project's github repository
https://github.com/p-fassbender/employee-tracker

---

## Questions
Any questions feel free to contact me via [my github](https://github.com/p-fassbender) or by sending me an email at fassbenderp0551@gmail.com.

---

## USER STORY
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## ACCEPTANCE CRITERIA
* GIVEN a command-line application that accepts user input
* WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database