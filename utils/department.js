const inquirer = require("inquirer");
const db = require('../db/connection');

// inquirer questions and prompt get the budget for an existing department
const departmentBudgetPrompt = (departmentRows) => {
    let newDepartmentRows = departmentRows.map(({ id, name }) => {
        return {
            name: name,
            value: id
        }
    });
    const departmentBudgetQuestions = [
        {
            type: 'list',
            name: 'budgetDepartment',
            message: 'Which department do you want to see the budget for?',
            choices: newDepartmentRows
        }
    ]
    return inquirer.prompt(departmentBudgetQuestions);
}

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

// returns a promise of the sum of all the roles salaries in an individual department
const getBudget = async (answers) => {
    let sql = `SELECT department.name AS department, SUM(role.salary) AS budget FROM role 
        RIGHT JOIN department ON role.department_id = department.id
        WHERE role.department_id = (?)`
    let params = [answers.budgetDepartment];
    return db.promise().query(sql, params)
}

// gets all departments and displays the results in a table in the console
const displayDepartments = (init) => {
    getDepartments()
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
            init()
        })
}

// prompts the user to select an existing department, gets the budget from the answer, and displays the results in a table in the console
const displayDepartmentBudget = async (init) => {
    let [departmentRows] = await getDepartments();
    departmentBudgetPrompt(departmentRows)
        .then((answers) => {
            getBudget(answers)
                .then(([rows]) => {
                    console.log('\n');
                    console.table(rows);
                    console.log('\n');
                    init();
                })
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
    displayDepartmentBudget,
    addDepartment,
    deleteDepartment
}