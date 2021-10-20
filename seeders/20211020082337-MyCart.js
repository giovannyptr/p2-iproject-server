'use strict'
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./datas/mycart.json', 'utf8'))
    data.forEach(each => {
      each.createdAt = new Date()
      each.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('MyCarts', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MyCarts', null, {})
  }
};
