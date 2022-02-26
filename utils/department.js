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
            db.query(sql, params);
            init()
        })
}

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