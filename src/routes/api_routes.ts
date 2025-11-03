import express, { Request, Response } from "express"
import Utils from "../utils"
import { generatePdf } from "../controlers"

const ApiRoutes = express.Router()

ApiRoutes.get("/ping", async (_req: Request, res: Response) => {
  Utils.sendSuccess(res, "pong")
})

// Auth
ApiRoutes.post("/generate", generatePdf)


export default ApiRoutes
