const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description generate interview report on basis of user self description, resume pdf and job description
 * @route POST /api/interview/
 * @access Private
 */
async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDesctiption,
        jobDescription,
        ...interviewReportByAi
    })
    response.status(201).json({
        message: "Interview Report generated successfully",
        interviewReport
    })
}

/**
 * @description get interview report by interviewId
 */
async function generateInterviewReportByIdController(req, res) {
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: 'Interview report not found'
        })
    }
    return res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @description get all interview reports of logged in user
 * @route GET /api/interview/
 * @access Private
 */
async function generateAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDesctiption -jobDescription -__v -technicalQuestions -skillGap -preparationPlan -behavioralQuestions")

    return res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}

module.exports = {
    generateInterviewReportController,
    generateInterviewReportByIdController,
    generateAllInterviewReportsController
}