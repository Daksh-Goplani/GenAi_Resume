const mongoose = require('mongoose')

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [{ type: String }],
    behavioralQuestions: [{ type: String }],
    skillGaps: [{ type: String }],
    preparationPlan: [{ type: String }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        required: [true, "Title is required"]
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel