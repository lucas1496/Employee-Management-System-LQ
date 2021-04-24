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

// Main application function - includes inquirer for user input and switch cases to run each query method
const startApp = () => {
    console.log(`Welcome to the Employee Management System! \n`)
    inquirer.prompt({
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
          'Exit',
        ],
    }).then((answer) => {
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
    
            case 'Exit':
                connection.end();
                break;
    
            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};

// Method to run Employee search query
const employeeSearch = () => {
    let query = 'SELECT id, first_name, last_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n \n Here are all the employees: \n`);
        console.table(res);
    });
    startApp();
};

// Method to run Department search query
const departmentSearch = () => {
    let query = 'SELECT id, name FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n \n Here are all the departments: \n`);
        console.table(res);
    });
    startApp();
};

// Method to run Role search query
const roleSearch = () => {
    let query = 'SELECT id, title FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n \n Here are all the roles: \n`);
        console.table(res);
    });
    startApp();
};

// Method to add Employee to DB
const addEmployee = () => {
    console.log(`Enter new employee's first and last name:`);
    startApp();
};

// Method to add Department to DB
const addDepartment = () => {
    console.log(`Enter new department's name:`);
    startApp();
};

// Method to add Role to DB
const addRole = () => {
    console.log(`Enter new role:`);
    startApp();
};

// Method to update Employee Role
const updateRole = () => {
    console.log(`Choose employee to update role:`);
    startApp();
};


// Connect to DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    startApp();
});






