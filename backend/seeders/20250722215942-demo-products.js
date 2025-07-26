"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Produto 1",
        description: "Descrição do Produto 1",
        category: "Categoria 1",
        price: 29.99,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produto 2",
        description: "Descrição do Produto 2",
        category: "Categoria 2",
        price: 49.9,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produto 3",
        description: "Descrição do Produto 3",
        category: "Categoria 3",
        price: 10.0,
        stock: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produto 4",
        description: "Descrição do Produto 4",
        category: "Categoria 4",
        price: 75.0,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produto 5",
        description: "Descrição do Produto 5",
        category: "Categoria 5",
        price: 12.99,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
