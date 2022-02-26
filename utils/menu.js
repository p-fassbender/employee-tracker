const inquirer = require("inquirer");

// inquirer questions and prompt for the main menu
const menuPrompt = () => {
    const menuQuestion = [
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees by Manager',
                'View Employees by Department',
                'View Department Budget',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update an Employee Manager',
                'Delete a Department',
                'Delete a Role',
                'Delete an Employee',
                'Quit'
            ]
        }
    ]
    return inquirer.prompt(menuQuestion);
}

module.exports = {
    menuPrompt
}