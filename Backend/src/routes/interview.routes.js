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

module.exports = interviewRouter