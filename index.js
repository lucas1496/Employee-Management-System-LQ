// Declare dependencies and establish connection to DB
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Buck.144',
    database: 'employeeDB',
});

// Banner method
const initBanner = () => {
    console.log(`Welcome to the Employee Management System! \n
|        ########:'##::::'##:'########::'##::::::::'#######::'##:::'##:'########:'########:                |
|        ##.....:: ###::'###: ##.... ##: ##:::::::'##.... ##:. ##:'##:: ##.....:: ##.....::                |
|        ##::::::: ####'####: ##:::: ##: ##::::::: ##:::: ##::. ####::: ##::::::: ##:::::::                |
|        ######::: ## ### ##: ########:: ##::::::: ##:::: ##:::. ##:::: ######::: ######:::                |
|        ##...:::: ##. #: ##: ##.....::: ##::::::: ##:::: ##:::: ##:::: ##...:::: ##...::::                |
|        ##::::::: ##:.:: ##: ##:::::::: ##::::::: ##:::: ##:::: ##:::: ##::::::: ##:::::::                |
|        ########: ##:::: ##: ##:::::::: ########:. #######::::: ##:::: ########: ########:                |
|        .......::..:::::..::..:::::::::........:::.......::::::..:::::........::........::                |
| ##::::'##::::'###::::'##::: ##::::'###:::::'######:::'########:'##::::'##:'########:'##::: ##:'########: |
| ###::'###:::'## ##::: ###:: ##:::'## ##:::'##... ##:: ##.....:: ###::'###: ##.....:: ###:: ##:... ##..:: |
| ####'####::'##:. ##:: ####: ##::'##:. ##:: ##:::..::: ##::::::: ####'####: ##::::::: ####: ##:::: ##:::: |
| ## ### ##:'##:::. ##: ## ## ##:'##:::. ##: ##::'####: ######::: ## ### ##: ######::: ## ## ##:::: ##:::: |
| ##. #: ##: #########: ##. ####: #########: ##::: ##:: ##...:::: ##. #: ##: ##...:::: ##. ####:::: ##:::: |
| ##:.:: ##: ##.... ##: ##:. ###: ##.... ##: ##::: ##:: ##::::::: ##:.:: ##: ##::::::: ##:. ###:::: ##:::: |
| ##:::: ##: ##:::: ##: ##::. ##: ##:::: ##:. ######::: ########: ##:::: ##: ########: ##::. ##:::: ##:::: |
| .:::::..::..:::::..::..::::..::..:::::..:::......::::........::..:::::..::........::..::::..:::::..::::: |
|                :'######::'##:::'##::'######::'########:'########:'##::::'##:                             |
|                '##... ##:. ##:'##::'##... ##:... ##..:: ##.....:: ###::'###:                             |
|                 ##:::..:::. ####::: ##:::..::::: ##:::: ##::::::: ####'####:                             |
|                . ######::::. ##::::. ######::::: ##:::: ######::: ## ### ##:                             |
|                :..... ##:::: ##:::::..... ##:::: ##:::: ##...:::: ##. #: ##:                             |
|                '##::: ##:::: ##::::'##::: ##:::: ##:::: ##::::::: ##:.:: ##:                             |
|                . ######::::: ##::::. ######::::: ##:::: ########: ##:::: ##:                             |
|                :......::::::..::::::......::::::..:::::........::..:::::..::                             |\n \n`)
};


// Main application function - includes inquirer for user input and switch cases to run each query method
const startApp = () => {
    inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add Employee',
          'Add Department',
          'Add Role',
          'Update Employee Role',
          'Remove Employee',
          'Exit',
        ],
    }]).then((answer) => {
        switch (answer.action) {
            case 'View All Employees':
                employeeSearch();
                break;
    
            case 'View All Departments':
                departmentSearch();
                break;
    
            case 'View All Roles':
                roleSearch();
                break;
    
            case 'Add Employee':
                addEmployee();
                break;
            
            case 'Add Department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;
            
            case 'Update Employee Role':
                updateRole();
                break;

            case 'Remove Employee':
                removeEmployee();
                break;
    
            case 'Exit':
                connection.end();
                break;
    
            default:
                console.log(`Invalid action: ${answer.action}`);
                connection.end();
                break;
        }
    });
};

// Method to run Employee search query
const employeeSearch = () => {
    let query = 
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary ';
    query +=
        'FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n \n Here are all the employees: \n`);
        console.table(res);
        startApp();
    });
};

// Method to run Department search query
const departmentSearch = () => {
    let query = 'SELECT id, name FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n \n Here are all the departments: \n`);
        console.table(res);
        startApp();
    });
};

// Method to run Role search query
const roleSearch = () => {
    let query = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n \n Here are all the roles: \n`);
        console.table(res);
        startApp();
    });
};

// Method to add Employee to DB
const addEmployee = () => {
    inquirer.prompt([{
        name: "empFirst",
        type: "input",
        message: "What is the new employee's first name?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a first name";
        }
    },
    {
        name: "empLast",
        type: "input",
        message: "What is the new employee's last name?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a last name";
        }
    },
    {
        name: "empRoleID",
        type: "input",
        message: "What is the new employee's role id?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a role id";
        }
    },
    {
        name: "empManagerID",
        type: "input",
        message: "What is the new employee's manager id? (Leave empty if new employee is a manager)",

    }]).then((answer) => {
        connection.query('INSERT INTO employee SET ?',
        {
            first_name: answer.empFirst,
            last_name: answer.empLast,
            role_id: answer.empRoleID,
            manager_id: answer.empManagerID,

        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${res.affectedRows} employee added!\n`);
            startApp();
        });
    });
};

// Method to add Department to DB
const addDepartment = () => {
    inquirer.prompt({
        name: "addDepartment",
        type: "input",
        message: "Enter a name for the new department",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter department name";
        },

    }).then((answer) => {
        connection.query('INSERT INTO department SET ?',
        {
            name: answer.addDepartment,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${res.affectedRows} department added!\n`);
            startApp();
        });
    });
};

// Method to add Role to DB
const addRole = () => {
    inquirer.prompt([{
        name: "roleTitle",
        type: "input",
        message: "Enter a title for the new role",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter role title";
        },

    },
    {
        name: "roleSalary",
        type: "input",
        message: "Enter a salary for the new role",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a salary";
        },

    },
    {
        name: "departmentID",
        type: "input",
        message: "What is the new role's department id?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a department id";
        },

    }]).then((answer) => {
        connection.query('INSERT INTO role SET ?',
        {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentID,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${res.affectedRows} role added!\n`);
            startApp();
        });
    });
};

// Method to update Employee Role
const updateRole = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: 'employee',
              type: 'rawlist',
              choices() {
                const choiceArray = [];
                results.forEach(({ last_name }) => {
                  choiceArray.push(last_name);
                });
                return choiceArray;
              },
              message: 'Choose an employee to update role',
            },
            {
              name: 'newRole',
              type: 'input',
              message: 'Please input the new role id for the employee',
            },
          ])
          .then((answer) => {
            // get the information of the chosen item
            let chosenEmployee;
            results.forEach((employee) => {
              if (employee.last_name === answer.employee) {
                chosenEmployee = employee;
              }
            });
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                  {
                    role_id: answer.newRole,
                  },
                  {
                    id: chosenEmployee.id,
                  },
                ],
                (error) => {
                  if (error) throw err;
                  console.log(`\n Employee's role updated successfully!\n`);
                  startApp();
                }
            );
          });
      });
};


const removeEmployee = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: 'employee',
              type: 'rawlist',
              choices() {
                const choiceArray = [];
                results.forEach(({ last_name }) => {
                  choiceArray.push(last_name);
                });
                return choiceArray;
              },
              message: 'Choose an employee to remove',
            },
          ])
          .then((answer) => {
            // get the information of the chosen item
            let chosenEmployee;
            results.forEach((employee) => {
              if (employee.last_name === answer.employee) {
                chosenEmployee = employee;
              }
            });
            connection.query(
                'DELETE FROM employee WHERE ?',
                [
                  {
                    id: chosenEmployee.id,
                  },
                ],
                (error) => {
                  if (error) throw err;
                  console.log(`\n Employee removed\n`);
                  startApp();
                }
            );
          });
      });
  };


// Connect to DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    initBanner();
    startApp();
});






