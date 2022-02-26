const inquirer = require("inquirer");

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
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Delete a Department',
                'Delete a Role',
                'Delete an Employee',
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
    return inquirer.prompt(menuQuestion);
}

module.exports = {
    menuPrompt
}