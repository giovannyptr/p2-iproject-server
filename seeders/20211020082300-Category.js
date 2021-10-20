'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./datas/category.json', 'utf8'))
     data.forEach(each => {
       each.createdAt = new Date()
       each.updatedAt = new Date()
     })
 
     await queryInterface.bulkInsert('Categories', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
