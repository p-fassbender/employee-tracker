const inquirer = require("inquirer");
const db = require('./db/connection');
const cTable = require('console.table');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

const menuQuestion = [
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
    }
]

const questions = [

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
    }
]

const menuPrompt = () => {
    return inquirer.prompt(menuQuestion);
}

const departmentAddPrompt = () => {
    const departmentQuestions = [
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        }
    ]
    return inquirer.prompt(departmentQuestions)
}

const roleAddPrompt = (rows) => {
    let newRows = rows.map(({ id, name }) => {
        return {
            name: name,
            value: id
        }
    });
    const roleQuestions = [
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',

        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does the role belong to?',
            choices: newRows
        }
    ]
    return inquirer.prompt(roleQuestions);
}

const getDepartments = () => {
    let sql = `SELECT * FROM department`
    return db.promise().query(sql)
}

const getRoles = () => {
    let sql = `SELECT * FROM role`
    return db.promise().query(sql)
}

const getEmployees = () => {
    let sql = `SELECT * FROM employee`
    return db.promise().query(sql)
}

const displayDepartments = () => {
    getDepartments().then(([rows]) => {
        console.table(rows);
        menuPrompt();
    })
}

const displayRoles = () => {
    getRoles().then(([rows]) => {
        console.table(rows);
        menuPrompt();
    })
}

const displayEmployees = () => {
    getEmployees().then(([rows]) => {
        console.table(rows);
        menuPrompt();
    })
}

const addDepartment = () => {
    departmentAddPrompt()
        .then((answers) => {
            let sql = `INSERT INTO department (name)
                    VALUES (?)`;
                let params = [answers.departmentName];
                db.promise.query(sql, params);
        })
}

const addRole = () => {
    getDepartments().then(([rows]) => {
        roleAddPrompt(rows)
            .then((answers) => {
                let sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?,?,?)`;
                let params = [answers.roleTitle, parseInt(answers.roleSalary), answers.roleDepartment];
                db.promise.query(sql, params);
            });
    })
}

menuPrompt()
    .then((answers) => {
        switch (answers.menu) {
            case 'View All Departments': // done
                displayDepartments()
                break;
            case 'View All Roles': // done
                displayRoles();
                break;
            case 'View All Employees': // done
                displayEmployees();
                break;
            case 'Add a Department': // done
                addDepartment();
                break;
            case 'Add a Role': // done
                addRole();
                break;
            case 'Add an Employee':
                break;
            case 'Update an Employee Role':
                break;
            case 'Quit':
                process.exit();
        }
    })
    .catch((error) => {
        console.log(error);
    });