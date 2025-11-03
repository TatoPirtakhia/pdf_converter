import env from "dotenv"
env.config()

import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import ApiRoutes from "./routes/api_routes"
import cors from "cors"

const app = express()
const port = process.env.PORT || 5001

app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json({ limit: '90mb' }))

app.use("/api/pdf/v1", ApiRoutes)

app.get("*", (req: Request, res: Response) => {
  res.locals.db?.release()
  res.sendFile(__dirname + "/public/index.html")
})

async function main() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
