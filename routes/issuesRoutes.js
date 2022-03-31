const router = require('express').Router()
const issueController = require('../controller/issueController')


router.post('/createIssue', issueController.issueCreate)
router.put('/resolveIssue', issueController.resolveIssue)
module.exports = router