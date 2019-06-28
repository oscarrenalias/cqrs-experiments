// Connect to CockroachDB through Sequelize.
const Sequelize = require('sequelize-cockroachdb'),
      Model = Sequelize.Model;

var sequelize = new Sequelize('bank', 'maxroach', '', {
  host: 'cockroachdb',
  dialect: 'postgres',
  port: 26257,
  logging: false
});

class Account extends Model {}
Account.init(
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        balance: { type: Sequelize.DECIMAL, defaultValue: 0.0 }
    }, { sequelize, modelName: "account" }
)

class Customer extends Model {}
Customer.init(
    {
        id: { type: Sequelize.STRING, primaryKey: true },
        name: { type: Sequelize.STRING }
    }, { sequelize, modelName: "customer" }
)
Customer.hasMany(Account);

Customer.sync({force: true});
Account.sync({force: true});

module.exports = {
    sequelize: sequelize,
    Account: Account,
    Customer: Customer
}