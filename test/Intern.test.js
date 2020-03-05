const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("getSchool", () => {
    it("should get the school property of the object", () => {
      const school = "University of Houston";
      const intern = new Intern(
        "Aaron",
        2,
        "aaronealdama@gmail.com",
        "University of Houston"
      );
      const getInfo = intern.getSchool();
      expect(getInfo).toEqual(school);
    });
  });
  describe("getRole", () => {
    it("should return Intern", () => {
      const role = "Intern";
      const intern = new Intern();
      const getInfo = intern.getRole();
      expect(getInfo).toEqual(role);
    });
  });
});
