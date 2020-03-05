const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("getGithub", () => {
    it("should return the engineer Github", () => {
      const github = "aaronealdama";
      const engineer = new Engineer(
        "Aaron",
        2,
        "aaronealdama@gmail.com",
        "aaronealdama"
      );
      const getInfo = engineer.getGithub();
      expect(getInfo).toEqual(github);
    });
  });
  describe("getRole", () => {
    it("should return Engineer", () => {
      const role = "Engineer";
      const engineer = new Engineer();
      const getInfo = engineer.getRole();
      expect(getInfo).toEqual(role);
    });
  });
});
