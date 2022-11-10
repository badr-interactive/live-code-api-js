'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [{
      name: 'admin',
      role: 1,
      email: 'admin@example.com',
      password: '$2a$10$OXoAMXYJ1Sunebe9pD6EHuzGHxgk6JE0nbRWjFsSOWvu39eO4CeNy',
      mobile_phone: '08128808090',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
