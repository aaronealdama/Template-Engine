const Employee = require("../lib/Employee");

describe("Employee", () => {
    describe("getName", () => {
        it("should return the object name", () => {
            const name = "Aaron";
            const employee = new Employee("Aaron", 1,"Engineer");
            const getInfo = employee.getName();
            expect(getInfo).toEqual(name);
        })
    })
    describe("getId", () => {
        it("should return the object id", () => {
            const id = 2;
            const employee = new Employee("Aaron",2,"Engineer");
            const getInfo = employee.getId();
            expect(getInfo).toEqual(id);
        })
    })
})