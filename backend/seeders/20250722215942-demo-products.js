'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Camiseta Wanted Preta',
        description: 'Camiseta da Wanted da cor Preta tamanho G',
        category: 'Vestuário',
        price: 91.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Notebook DELL 15',
        description: 'Notebook Dell com 15 polegadas, 16GB de RAM e 512GB de SSD',
        category: 'Informática',
        price: 2999.99,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sofá 3 lugares',
        description: 'Sofá 3 lugares, com 2 cadeiras e 1 mesa',
        category: 'Móveis',
        price: 3000.0,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Camiseta Marvel Vermelha',
        description: 'Camiseta da Marvel da cor Vermelha tamanho M',
        category: 'Infantil',
        price: 75.0,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Panela de Inox',
        description: 'Panela de Inox com 2 litros',
        category: 'Cozinha',
        price: 69.99,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
