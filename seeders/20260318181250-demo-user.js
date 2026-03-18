"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        passwordHash:
          "4f3c2a1b9d8e7f601122334455667788:eddc605eae9a29f2a32c495b3c0442c4b31136c95c5be34cc25509756e1336ebf2d68d6b700c3af72cae850b1479f23a82ce104596468fc02d662cbe5d3e71fc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Users", { email: "example@example.com" }, {});
  },
};