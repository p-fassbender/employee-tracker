const inquirer = require("inquirer");
const db = require('../db/connection');

// inquirer questions and prompt to add a new department
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

// inquirer question and prompt to delete an existing department
const departmentDeletePrompt = (departmentRows) => {
    let newDepartmentRows = departmentRows.map(({ id, name }) => {
        return {
            name: name,
            value: id
        }
    });
    const deleteDepartmentQuestions = [
        {
            type: 'list',
            name: 'deletedDepartment',
            message: 'What department do you want to delete?',
            choices: newDepartmentRows
        }
    ]
    return inquirer.prompt(deleteDepartmentQuestions);
}

// returns a promise of all the departments in the department table
const getDepartments = () => {
    let sql = `SELECT * FROM department`
    return db.promise().query(sql)
}

// gets all departments and displays the results in a table in the console
const displayDepartments = (init) => {
    getDepartments()
        .then(([rows]) => {
            console.table(rows);
            init()
        })
}

// prompts the user to add a department and then inserts the answers into the department table
const addDepartment = (init) => {
    departmentAddPrompt()
        .then((answers) => {
            let sql = `INSERT INTO department (name)
                    VALUES (?)`;
            let params = [answers.departmentName];
            db.query(sql, params);
            init()
        })
}

// prompts the user to select an existing department and then deletes the department from the department table
const deleteDepartment = async (init) => {
    let [departmentRows] = await getDepartments();
    departmentDeletePrompt(departmentRows)
        .then((answers) => {
            let sql = `DELETE FROM department WHERE id = (?)`;
            let params = [answers.deletedDepartment];
            db.query(sql, params);
            init();
        })
}

module.exports = {
    departmentAddPrompt,
    getDepartments,
    displayDepartments,
    addDepartment,
    deleteDepartment
}