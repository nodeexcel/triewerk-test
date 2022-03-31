const express = require('express')
require('dotenv').config()
// const SupportAgent = require('./model/supportAgentModel')
const {sequelizeConnection} = require('./connection/sqlConnection') 
const app = express()
app.use(express.json());
const port = process.env.PORT || 8080
const createConnection = async () => {
  try {
    await sequelizeConnection.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

createConnection()
app.use('/issue', require('./routes/issuesRoutes'));

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})