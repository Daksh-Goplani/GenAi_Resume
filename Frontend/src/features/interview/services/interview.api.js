import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

/**
 * @description generate interview report on basis of user self description, resume pdf and job description
 * @route POST /api/interview/
 * @access Private
 */
export const generateInterviewReport = async ({ selfDescription, jobDescription, resumeFile }) => {
    const formData = new FormData()
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

/**
 * @description get interview report by interviewId
 * @route GET /api/interview/report/:interviewId
 * @access Private
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

/**
 * @description get all interview reports of logged in user
 * @route GET /api/interview/
 * @access Private
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")
    return response.data
}

/**
 * @description generate resume pdf on basis of user self description, job description
 */
export const generateResumePdf = async (interviewReportId) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`,null, {
        responseType: "blob"
    })
    return response.data
}