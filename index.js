const inquirer = require("inquirer");

const questions = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Quit'
            // *BONUS*
            // update employee managers, 
            // view employees by manager,
            // view employees by department,
            // delete department,
            // delete roles,
            // delete employees
        ]
    },
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
        when: (answers) => answers.menu === 'Add a Department'
    },
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the name of the role?',
        when: (answers) => answers.menu === 'Add a Role'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?',
        when: (answers) => answers.menu === 'Add a Role'
    },
    {
        type: 'input', // needs to be a list
        name: 'roleDepartment',
        message: 'What department does the role belong to?',
        // choices needs to be populated with already existing departments
        when: (answers) => answers.menu === 'Add a Role'
    },
    {
        type: 'input',
        name: 'employeeFirstName',
        message: "What is the employee's first name?",
        when: (answers) => answers.menu === 'Add an Employee'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: "What is the employee's last name?",
        when: (answers) => answers.menu === 'Add an Employee'
    },
    {
        type: 'input', // needs to be a list
        name: 'employeeRole',
        message: "What is the employee's role?",
        // choices need to be populated with already existing roles
        when: (answers) => answers.menu === 'Add an Employee'
    },
    {
        type: 'input', // needs to be a list
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        // choices need to be populated with already existing employees
        when: (answers) => answers.menu === 'Add an Employee'
    },
    {
        type: 'input', // needs to be a list
        name: 'updateEmployeeName',
        message: "Which employee's role do you want to update?",
        // choices need to be populated with already existing employees
        when: (answers) => answers.menu === 'Update an Employee Role'
    },
    {
        type: 'input', // needs to be a list
        name: 'updateEmployeeRole',
        message: "What role do you want to assign the selected employee?",
        // choices need to be populated with already existing employees
        when: (answers) => answers.menu === 'Update an Employee Role'
    },

]

inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers);
        // switch case with the answers to fetch different queries?
        // end with .prompt(questions) again
    })
    .catch((error) => {
        console.log(error);
    });