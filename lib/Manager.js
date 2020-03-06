const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNum) {
    super(name, id, email);
    this.title = "Manager";
    this.officeNum = officeNum;
  }
}

module.exports = Manager;
