const {sequelizeConnection, Sequelize} = require('../connection/sqlConnection')
const Issues = require('./issuesModel')
const agentData = require('../DummyData/agentsData')
var SupportAgent = sequelizeConnection.define("support_agent", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: Sequelize.ENUM("FREE", "OCCUPIED"),
    defaultValue: "FREE",
  },
  issueId: {
    type: Sequelize.UUID
  }
});

SupportAgent.sync({alter:true}).then(()=> { 
  SupportAgent.bulkCreate(agentData)
    .then(() => console.log("Data inserted"))
    .catch((err) => console.log(err));
}).catch(err => console.log(err))

module.exports = SupportAgent;