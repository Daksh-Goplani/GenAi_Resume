require('dotenv').config()
const app = require("./src/app")
const connectDb = require("./src/config/db")

app.set('trust proxy', 1)

const port = process.env.PORT || 3000

connectDb()

app.listen(port, () => {
    console.log("Server is running on port " + port)
})