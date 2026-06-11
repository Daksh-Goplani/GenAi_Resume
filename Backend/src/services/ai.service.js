const { GoogleGenAI } = require('@google/genai')
const z = require('zod')
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    title: z.string().describe("The title of the job for which the interview report is generated"),
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.string()).describe("Technical questions that can be asked in the interview"),
    behavioralQuestions: z.array(z.string()).describe("Behavioral questions that can be asked in the interview"),
    skillGaps: z.array(z.string()).describe("List of skill gaps in the candidate's profile"),
    preparationPlan: z.array(z.string()).describe("A preparation plan broken into simple steps or topics"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
Generate an interview report.

Return ONLY valid JSON.

Follow this structure EXACTLY:

{
  "title": "Junior MERN Developer Interview Report",
  "matchScore": 90,
  "technicalQuestions": ["Explain JWT Authentication", "Describe REST API best practices"],
  "behavioralQuestions": ["Tell me about a challenge", "Describe a time you worked on a team"],
  "skillGaps": ["Testing", "System design"],
  "preparationPlan": ["Review React hooks", "Practice data structure problems"]
}

IMPORTANT:
- technicalQuestions must be an array of strings
- behavioralQuestions must be an array of strings
- skillGaps must be an array of strings
- preparationPlan must be an array of strings
- Do not return arrays of objects
- Return only JSON

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    });

    console.log("RAW AI RESPONSE:");
    console.log(response.text);

    const parsed = JSON.parse(response.text);

    const result = interviewReportSchema.safeParse(parsed);

    if (!result.success) {
        console.log("ZOD VALIDATION ERROR:");
        console.log(result.error.format());
        console.log(JSON.stringify(result.error.issues, null, 2))
        throw new Error("AI returned invalid format");
    }

    return result.data;

}

module.exports = generateInterviewReport