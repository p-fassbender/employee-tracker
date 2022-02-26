const inquirer = require("inquirer");
const db = require('../db/connection');
const dept = require('./department');

// inquirer questions and prompt to add a new role
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

// inquirer questions and prompt to delete an existing role
const roleDeletePrompt = (roleRows) => {
    let newRoleRows = roleRows.map(({ id, title }) => {
        return {
            name: title,
            value: id
        }
    });
    const deleteRoleQuestions = [
        {
            type: 'list',
            name: 'deletedRole',
            message: 'What role do you want to delete?',
            choices: newRoleRows
        }
    ]
    return inquirer.prompt(deleteRoleQuestions);
}

// returns a promise of all the roles in the role table
const getRoles = () => {
    let sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role 
        LEFT JOIN department ON role.department_id = department.id`
    return db.promise().query(sql)
}

// gets all roles and displays the results in a table in the console
const displayRoles = (init) => {
    getRoles()
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
            init()
        })
}

// prompts the user to add a role then inserts the answers into the role table
const addRole = (init) => {
    dept.getDepartments().then(([rows]) => {
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

// prompts the user to select an existing role then deletes the role from the role table
const deleteRole = async (init) => {
    let [roleRows] = await getRoles();
    roleDeletePrompt(roleRows)
        .then((answers) => {
            let sql = `DELETE FROM role WHERE id = (?)`;
            let params = [answers.deletedRole];
            db.query(sql, params);
            init();
        })
}

module.exports = {
    roleAddPrompt,
    getRoles,
    displayRoles,
    addRole,
    deleteRole
}