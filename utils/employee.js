const inquirer = require("inquirer");
const db = require('../db/connection');
const role = require('./role');

// inquirer questions and prompt to add a new employee
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

// inquirer questions and prompt to delete an existing employee
const employeeDeletePrompt = (employeeRows) => {
    let newEmployeeRows = employeeRows.map(({ id, first_name, last_name }) => {
        return {
            name: first_name + " " + last_name,
            value: id
        }
    });
    const deleteEmployeeQuestions = [
        {
            type: 'list',
            name: 'deletedEmployee',
            message: "Which employee would you like to delete?",
            choices: newEmployeeRows,
        }
    ]
    return inquirer.prompt(deleteEmployeeQuestions);
}

// inquirer questions and prompt to update an employee's role
const updateEmployeeRolePrompt = (roleRows, employeeRows) => {
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
    const updateEmployeeRoleQuestions = [
        {
            type: 'list', // needs to be a list
            name: 'updatedEmployeeName',
            message: "Which employee's role do you want to update?",
            choices: newEmployeeRows
        },
        {
            type: 'list', // needs to be a list
            name: 'updatedEmployeeRole',
            message: "What role do you want to assign the selected employee?",
            choices: newRoleRows
        }
    ]
    return inquirer.prompt(updateEmployeeRoleQuestions);
}

// inquirer questions and prompt to update an employee's manager
const updateEmployeeManagerPrompt = (employeeRows) => {
    let newEmployeeRows = employeeRows.map(({ id, first_name, last_name }) => {
        return {
            name: first_name + " " + last_name,
            value: id
        }
    });
    const updateEmployeeRoleQuestions = [
        {
            type: 'list', // needs to be a list
            name: 'updatedEmployeeName',
            message: "Which employee's manager do you want to update?",
            choices: newEmployeeRows
        },
        {
            type: 'list', // needs to be a list
            name: 'updatedEmployeeManager',
            message: "Who is this employee's manager?",
            choices: newEmployeeRows
        }
    ]
    return inquirer.prompt(updateEmployeeRoleQuestions);
}

// returns a promise of all the employees in the employee table
const getEmployees = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee employee
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department on department.id = role.department_id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`
    return db.promise().query(sql)
}

// returns a promise of all the employees in the employee table ordered by manager
const getEmpByManager = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee employee
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department on department.id = role.department_id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
        ORDER BY manager`
    return db.promise().query(sql)
}

// returns a promise of all the employees in the employee table ordered by department
const getEmpByDepartment = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee employee
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department on department.id = role.department_id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
        ORDER BY department`
    return db.promise().query(sql)
}

// gets all employees and displays the results in a table in the console
const displayEmployees = (init) => {
    getEmployees()
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');;
            init()
        })
}

// gets all employees ordered by manager and displays the results in a table in the console
const displayEmpByManager = (init) => {
    getEmpByManager()
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');;
            init()
        })
}

// gets all employees ordered by department and displays the results in a table in the console
const displayEmpByDepartment = (init) => {
    getEmpByDepartment()
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');;
            init()
        })
}

// prompts the user to add an employee then inserts the answers into the employee table
const addEmployee = async (init) => {
    let [roleRows] = await role.getRoles();
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

// prompts the user to update an employee's role then updates the employee in the employee table
const updateEmployeeRole = async (init) => {
    let [roleRows] = await role.getRoles();
    let [employeeRows] = await getEmployees();
    updateEmployeeRolePrompt(roleRows, employeeRows)
        .then((answers) => {
            let sql = `UPDATE employee SET role_id = (?) WHERE employee.id = (?)`;
            let params = [answers.updatedEmployeeRole, answers.updatedEmployeeName]
            db.query(sql, params);
            init()
        })
}

// prompts the user to update an employee's manager then updates the employee in the employee table
const updateEmployeeManager = async (init) => {
    let [employeeRows] = await getEmployees();
    updateEmployeeManagerPrompt(employeeRows)
        .then((answers) => {
            console.log(answers)
            let sql = `UPDATE employee SET manager_id = (?) WHERE employee.id = (?)`;
            let params = [answers.updatedEmployeeManager, answers.updatedEmployeeName]
            db.query(sql, params);
            init()
        })
}

// prompts the user to select an existing employee then deletes that employee from the employee table
const deleteEmployee = async (init) => {
    let [employeeRows] = await getEmployees();
    employeeDeletePrompt(employeeRows)
        .then((answers) => {
            let sql = `DELETE FROM employee WHERE id = (?)`;
            let params = [answers.deletedEmployee];
            db.query(sql, params);
            init();
        })
}

module.exports = {
    employeeAddPrompt,
    getEmployees,
    getEmpByManager,
    displayEmployees,
    displayEmpByManager,
    displayEmpByDepartment,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEmployee
}