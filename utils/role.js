const inquirer = require("inquirer");
const db = require('../db/connection');

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
            type: 'number',
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

// job title, role id, the department that role belongs to, and the salary
const getRoles = () => {
    let sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role 
        LEFT JOIN department ON role.department_id = department.id`
    return db.promise().query(sql)
}

const displayRoles = (init) => {
    getRoles()
        .then(([rows]) => {
            console.table(rows);
            init()
        })
}

const addRole = (init) => {
    getDepartments().then(([rows]) => {
        roleAddPrompt(rows)
            .then((answers) => {
                let sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?,?,?)`;
                let params = [answers.roleTitle, answers.roleSalary, answers.roleDepartment];
                db.query(sql, params);
                init()
            })
    })
}

module.exports = {
    roleAddPrompt,
    getRoles,
    displayRoles,
    addRole
}