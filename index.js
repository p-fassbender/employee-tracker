const db = require('./db/connection');
const cTable = require('console.table');
const { displayDepartments, addDepartment } = require('./utils/department');
const { displayRoles, addRole } = require('./utils/role');
const { displayEmployees, addEmployee } = require('./utils/employee')
const { menuPrompt } = require('./utils/menu')

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

const init = () => {
    menuPrompt()
        .then((answers) => {
            switch (answers.menu) {
                case 'View All Departments': // done
                    displayDepartments(init)
                    break;
                case 'View All Roles': // done
                    displayRoles(init);
                    break;
                case 'View All Employees': // done
                    displayEmployees(init);
                    break;
                case 'Add a Department': // done
                    addDepartment(init);
                    break;
                case 'Add a Role': // done
                    addRole(init);
                    break;
                case 'Add an Employee': //done
                    addEmployee(init);
                    break;
                case 'Update an Employee Role':
                    break;
                case 'Quit':
                    process.exit();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

init();