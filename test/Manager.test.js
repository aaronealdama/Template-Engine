const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("getRole", () => {
    it("should return manager", () => {
      const role = "Manager";
      const manager = new Manager();
      const getInfo = manager.getRole();
      expect(getInfo).toEqual(role);
    });
  });
});
