const inquirer = require("inquirer");
const db = require('../db/connection');

const updateEmployeeQuestions = [
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

const employeeAddPrompt = (roleRows, employeeRows) => {
    let newRoleRows = roleRows.map(({ id, title }) => {
        return {
            name: title,
            value: id
        }
    });
    let newEmployeeRows = employeeRows.map(({ id, first_name, last_name }) => {
        return {
            name: first_name + " " + last_name,
            value: id
        }
    });
    const addEmployeeQuestions = [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?",
            choices: newRoleRows
        },
        {
            type: 'confirm',
            name: 'managerConfirm',
            message: "Does this employee have a manager",
            default: false,
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is this employee's manager?",
            choices: newEmployeeRows,
            when: (answers) => answers.managerConfirm == true
        }
    ]
    return inquirer.prompt(addEmployeeQuestions);
}

// employee ids, first names, last names, job titles, departments, salaries, and managers
const getEmployees = () => {
    let sql = `SELECT employee.id, concat(employee.first_name, ' ', employee.last_name) AS name, role.title, department.name AS department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee employee
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department on department.id = role.department_id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`
    return db.promise().query(sql)
}

const displayEmployees = (init) => {
    getEmployees()
        .then(([rows]) => {
            console.table(rows);
            init()
        })
}

const addEmployee = async (init) => {
    let [roleRows] = await getRoles();
    let [employeeRows] = await getEmployees();
    employeeAddPrompt(roleRows, employeeRows)
        .then((answers) => {
            let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;
            let params;
            if (answers.managerConfirm) {
                params = [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager];
            }
            else {
                params = [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, null]
            }
            db.query(sql, params);
            init()
        })
}

module.exports = {
    employeeAddPrompt,
    getEmployees,
    displayEmployees,
    addEmployee
}