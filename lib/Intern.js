const Employee = require("./Employee.js");
function Intern(name, id, email, school) {
  Employee.call(this, name, id, email);
  this.school=school; 
  this.getSchool= function(){
    return school; 
  }
  this.getRole= function(){
    return 'Intern';
  };
};

module.exports= Intern;