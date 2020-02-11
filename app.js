const inquirer= require ("inquirer");
const fs = require ("fs");
const util = require ("util")
const jest = require ("jest");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const employees = []; 
let internHTML = "";
let managerHTML = "";
let engineerHTML = ""; 
let teamMembers = ""; 

getEmployeeInfo();

function getEmployeeInfo (){
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
      const manager = new Manager(res.name, res.id, res.email); 

      inquirer.prompt([
        {
          type: "number",
          message: "What is the manager's office phone number?",
          name: "officeNumber"

        },
      ]) 
      .then(function(res){
        manager.officeNumber = res.officeNumber; 
        employees.push(manager)
        addEmployee();
      })
    }

    else if (res.role === "Engineer"){
    const engineer = new Engineer(res.name, res.id, res.email); 
    inquirer.prompt([
      {
        type: "input",
        message: "What is your GitHub username?",
        name: "gitHub", 
      }
    ])
      .then(function(res){
        engineer.gitHub = res.gitHub; 
        employees.push(engineer)
        addEmployee();

      });
    }
    else if (res.role === "Intern"){
      const intern = new Intern(res.name, res.id, res.email);
      inquirer.prompt([
        {
          type: "input",
          message: "Where did the Intern attend school?",
          name: "school",
        }
      ])
      .then(function(res){
        intern.school= res.school;
        employees.push(intern);
        addEmployee();

      })
    }
  });
}
function addEmployee(){
  //TODO: add empty array to hold employees 
  inquirer.prompt({
    type: "confirm",
    message: "Add new employee?",
    name: "response"
  }).then(function(res){
    if(res.response){
      getEmployeeInfo()

    } else {
      console.log(employees)
      printTeam();
      
    }
  })
}
// console.log(employees)

function printTeam(){
  employees.forEach(teamMember => {
    if (teamMember.getRole() === "Manager") {
      const { name, id, email, officeNumber } = teamMember;
      function updateManager() {
      let data = fs.readFileSync("./templates/manager.html", "utf8");

        managerHTML = data
          .replace(`{{ name }}`, `${name}`)
          .replace(`{{ role }}`, `Manager`)
          .replace(`{{ id }}`, `${id}`)
          .replace(`{{ email }}`, `${email}`)
          .replace(`{{ officeNumber }}`, `${officeNumber}`);

        teamMembers += managerHTML;
  };
  updateManager(); 
} else if (teamMember.getRole() === "Engineer") {
  const { name, id, email, gitHub } = teamMember;
  function updateEngineer() {
    let data = fs.readFileSync("./templates/engineer.html", "utf8");
    engineerHTML = data
      .replace(`{{ name }}`, `${name}`)
      .replace(`{{ role }}`, `Engineer`)
      .replace(`{{ id }}`, `${id}`)
      .replace(`{{ email }}`, `${email}`)
      .replace(`{{ username }}`, `${gitHub}`);
    teamMembers += engineerHTML;
  }
  updateEngineer();
} else if (teamMember.getRole() === "Intern") {
  const { name, id, email, school } = teamMember;
  function updateIntern() {
    let data = fs.readFileSync("./templates/intern.html", "utf8");
    internHTML = data
      .replace(`{{ name }}`, `${name}`)
      .replace(`{{ role }}`, `Intern`)
      .replace(`{{ id }}`, `${id}`)
      .replace(`{{ email }}`, `${email}`)
      .replace(`{{ school }}`, `${school}`);

  teamMembers += internHTML;
 
  }
  updateIntern();
}
  createHTML();

  function createHTML(){
    fs.readFile("./templates/main.html", "utf8", (err, data)=> {
      if (err) throw error; 

      const newTeamHTML = data.replace(`{{ content }}`, teamMembers)
      fs.writeFile("./output/main.html", newTeamHTML, "utf8", err => {
        if (err) throw error;
        console.log("created HTML!");
    })
  })
  }
}
);
}
