const inquirer= require ("inquirer");

const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

let employeeArr = [];

const getEmployeeInfo = function(){
  inquirer.prompt ([
    { 
      type: "input",
      message: "What is the employee's name?",
      name: "name",
    },
    
    {
      type: "number",
      message: "What is the employee's ID?",
      name: "id", 
    },

    {
      type: "input",
      message: "What is the employee's email?",
      name: "email", 
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role", 
      choices: ["Manager", "Engineer", "Intern"],

    },
  ])
  .then(function(res){
    if (res.role === "Manager"){
      const newManager = new Manager(res.name, res.id, res.email); 

      inquirer.prompt([
        {
          type: "number",
          message: "What is the manager's office phone number?",
          name: "officeNumber"

        },
      ]) 
      .then(function(res){
        newManager.officeNumber = res.officeNumber; 
        employeeArr.push(newManager)
        addEmployee();
      })
    }

    else if (res.role === "Engineer"){
    const newEngineer = new Engineer(res.name, res.id, res.email); 
    inquirer.prompt([
      {
        type: "input",
        message: "What is your GitHub username?",
        name: "gitHub", 
      }
    ])
      .then(function(res){
        newEngineer.gitHub = res.gitHub; 
      });
    }
    else if (res.role === "Intern"){
      const newIntern = new Intern(res.name, res.id, res.email);
      inquirer.prompt([
        {
          type: "input",
          message: "Where did the Intern attend school?",
          name: "school",
        }
      ])
      .then(function(res){
        newIntern.school= res.school;
      })
    }
  });
}

function addEmployee(){
  inquirer.prompt({
    type: "confirm",
    message: "Add new employee?",
    name: "response"
  }).then(function(res){
    if(res.response){
      getEmployeeInfo()
    } else {
      console.log(employeeArr)
      //make html file
      //makeHTMLstuff()
    }
  })
}

function makeHTMLstuff(){
  employeeArr.forEach(employee => {
    switch (employee.getRole()) {
      case "Engineer":
        
        break;
      case "Intern":
        
        break;
      case "Manager":
        
        break;
    
      default:
        break;
    }
  });
}

getEmployeeInfo();