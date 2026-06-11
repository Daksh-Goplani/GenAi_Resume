const express = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controller/interview.controller")
const upload = require("../middleware/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @access Private
 * @description generate new interview report on basis of user self description, resume pdf and job description
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume") ,interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.generateInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.generateAllInterviewReportsController)

module.exports = interviewRouter