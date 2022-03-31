const Issues = require("../model/issuesModel");
const SupportAgent = require('../model/supportAgentModel')

exports.issueCreate = async (req, res) => {
    try {
        let {issue} = req.body;
        if (!issue) throw new Error("Issue is missing");
        const newIssue = await Issues.create({issue})
        res.status(200).send(newIssue)
    }catch (error) {
        res.status(500).send(error)
    }
}

exports.resolveIssue = async(req,res)=>{
  try{
   let {issueId} = req.body;
    if(!issueId) throw new Error('Issue Id is missing')
    const agentWithIssue = await Issues.findOne({where:{id: issueId}})
    await SupportAgent.update({status: "FREE", issueId: null},{where: {issueId: issueId}})
    await Issues.update({status: "RESOLVED"},{where: {id: issueId}})
    const issues = await Issues.findOne({where:{status: "UNASSIGNED"}})
    if(issues){
      await SupportAgent.update({status: "OCCUPIED", issueId: issues.dataValues.id},{where:{id: agentWithIssue.dataValues.id}})
    }
    res.status(200).send('Issue update')
  }catch(error){
    res.status(500).send(error.message)
  }
}