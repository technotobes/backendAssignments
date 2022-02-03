'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.addColumn('Posts', 'category', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.removeColumn('Posts', 'category')

  }
};
