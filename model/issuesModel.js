const {sequelizeConnection, Sequelize} = require('../connection/sqlConnection');
const SupportAgent = require('./supportAgentModel')
var Issues = sequelizeConnection.define("issues", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  issue:{
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("ASSIGNED", "RESOLVED",'UNASSIGNED'),
    defaultValue: "UNASSIGNED",
  }
});

Issues.addHook('afterCreate',async(issue)=>{
  const agent = await SupportAgent.findOne({where: {status: "FREE"}})
  await agent.update({status: "OCCUPIED", issueId: issue.dataValues.id},{where:{id: agent.dataValues.id}})
  await issue.update({status: 'ASSIGNED'})
})


module.exports = Issues;