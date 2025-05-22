import express, { NextFunction, Request, Response,} from "express"
import cors from "cors"
import "./database/index"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes"
import { corsUrl, environment, port } from "./config"
import todoRoutes from "./routes/todoRoutes"
import { errorHandler } from "./middleware/errorMiddleware"
import Logger from "./core/Logger"
import { ApiError, ErrorType } from "./core/ApiError"
import { InternalServerError } from "./core/CustomeError"

const PORT = port ?? 8080

export const app = express()

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/health",(req,res)=>{
    res.status(200).json({
        message:"up and grateful"
    })
})

app.use("/api/users", userRoutes)
app.use("/api/todo", todoRoutes)

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    if (err instanceof ApiError) {
        ApiError.handle(err,res)
        if(err.type === ErrorType.INTERNAL_SERVER_ERROR){
            Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        }else{
            Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            Logger.error(err.stack )
        }
        if (environment === 'development'){
            res.status(500).send({
                message:err.message,
                stack : err.stack 
            })
        }
        ApiError.handle(new InternalServerError, res)
    }

  
})


export default app