import {createLogger, transports, format} from "winston"
import { environment, logDirectory } from "../config"
import path from "path"
import { existsSync, mkdirSync } from "fs"
import DailyRotateFile from "winston-daily-rotate-file"


// The logDirectory is determined from the configuration file (../src/config).
//  If it is not defined, it defaults to "logs". The code ensures that the directory exists by checking with existsSync and creating it with mkdirSync if necessary. 
// This ensures that logs can be written without errors due to missing directories.
let dir = logDirectory ?? "logs"

if (!dir) dir = path.resolve('logs')
    if (!existsSync(dir)){
        mkdirSync(dir )
    }

const logLevel = environment === "development" ? 'debug' : 'warn'

const dailyRotateFile = new DailyRotateFile({
    level:logLevel,
    filename:`${dir}/%DATE%-results.log`,
    datePattern:"YYYY-MM-DD",
    zippedArchive:true,
    handleExceptions:true,
    maxFiles:'14d',
    maxSize:'20m',
    format:format.combine(
        format.errors({stack:true}),
        format.colorize(),
        format.json()
    )
})

export default createLogger({
    transports: [
        new transports.Console({
            level:logLevel,
            format:format.combine(
                format.errors({stack:true}),
                format.colorize(),
                format.prettyPrint()
            )
        }),
        dailyRotateFile
    ],
    exceptionHandlers:[dailyRotateFile],
    exitOnError:false
})