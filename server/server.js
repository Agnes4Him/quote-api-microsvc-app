const express = require("express")
const cors = require("cors")
const textDisplayRoute = require("./routes/textDisplayRoute")
const monitoringRoute = require("./routes/monitoringRoute")

const PORT = 3333 || process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(textDisplayRoute)
app.use(monitoringRoute)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})