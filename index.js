const db = require('./db/connection');
const cTable = require('console.table');
const dept = require('./utils/department');
const role = require('./utils/role');
const emp = require('./utils/employee')
const { menuPrompt } = require('./utils/menu')

db.connect(err => {
    if (err) throw err;
});

const init = () => {
    menuPrompt()
        .then((answers) => {
            switch (answers.menu) {
                case 'View All Departments': // done
                    dept.displayDepartments(init)
                    break;
                case 'View All Roles': // done
                    role.displayRoles(init);
                    break;
                case 'View All Employees': // done
                    emp.displayEmployees(init);
                    break;
                case 'View Employees by Manager':
                    emp.displayEmpByManager(init); // done 
                    break;
                case 'View Employees by Department':
                    emp.displayEmpByDepartment(init); // done 
                    break;
                case 'View Department Budget':
                    dept.displayDepartmentBudget(init); // done 
                    break;
                case 'Add a Department': // done
                    dept.addDepartment(init);
                    break;
                case 'Add a Role': // done
                    role.addRole(init);
                    break;
                case 'Add an Employee': //done
                    emp.addEmployee(init);
                    break;
                case 'Update an Employee Role':
                    emp.updateEmployeeRole(init); // done
                    break;
                case 'Update an Employee Manager':
                    emp.updateEmployeeManager(init); // done
                    break;
                case 'Delete a Department':
                    dept.deleteDepartment(init); // done
                    break;
                case 'Delete a Role':
                    role.deleteRole(init); // done
                    break;
                case 'Delete an Employee':
                    emp.deleteEmployee(init); // done
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