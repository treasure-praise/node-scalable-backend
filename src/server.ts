import express from "express"
import cors from "cors"
import "./database/index"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes"
import { corsUrl, port } from "./config"
import todoRoutes from "./routes/todoRoutes"
import { errorHandler } from "./middleware/errorMiddleware"
import Logger from "./core/Logger"
import dotenv from "dotenv"
import app from "./app"

dotenv.config()
app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`)
}).on("error",(err)=>{
  Logger.error(err)
})
