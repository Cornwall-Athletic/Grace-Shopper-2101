const { DataTypes, UUIDV4, UUID } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: 'false',
  },
  date_of_purchase: {
    type: DataTypes.DATEONLY,
  },
  purchased_items: {
    type: DataTypes.JSON,
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Created', 'Processing', 'Complete', 'Cancelled']],
    },
    defaultValue: 'Created',
  },
});

module.exports = Order;
