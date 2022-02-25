const inquirer = require("inquirer");
const db = require('../db/connection');

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

const getDepartments = () => {
    let sql = `SELECT * FROM department`
    return db.promise().query(sql)
}

const displayDepartments = (init) => {
    getDepartments()
        .then(([rows]) => {
            console.table(rows);
            init()
        })
}

const addDepartment = (init) => {
    departmentAddPrompt()
        .then((answers) => {
            let sql = `INSERT INTO department (name)
                    VALUES (?)`;
            let params = [answers.departmentName];
            db.promise.query(sql, params);
            init()
        })
}

module.exports = {
    departmentAddPrompt,
    getDepartments,
    displayDepartments,
    addDepartment
}