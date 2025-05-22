import mongoose from "mongoose"
import { db } from "../config"
import Logger from "../core/Logger"

const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`

const options = {
  autoIndex: true,
  minPoolSize:db.minPoolSize,
  maxPoolSize:db.maxPoolSize,
  connectTimeoutMS:10000,
  socketTimeoutMS:45000
}

Logger.debug(dbURI)

function setRunValidators(){
  return {runValidators:true}
}

mongoose.set("strictQuery",true)

mongoose
  .plugin((schema:any)=>{
    schema.pre("findOneAndUpdate", setRunValidators)
    schema.pre("updateMany", setRunValidators)
    schema.pre("updateOne", setRunValidators)
    schema.pre("update", setRunValidators)
  })
  .connect(dbURI,options)
  .then(() => {
    Logger.info("MongoDB Connected")
    
  })
  .catch(err => {
    Logger.info("Mongoose Connection Error")
    Logger.error(err)
  })


  //Connection Events
//When Successfuly connected
mongoose.connection.on("connected",()=>{
  Logger.debug("Mongoose default connection open to ", + dbURI)
})

//If connection throws an Error
mongoose.connection.on("error",(err)=>{
  Logger.error("Mongoose default connection error:" + err)
})

//When Successfuly connected
mongoose.connection.on("disconnected",()=>{
  Logger.info("Mongoose default connection disconnected")
})

//if the node process ends, close the mongoose connceiton 
process.on("SIGINT",()=>{
  mongoose.connection.close().finally(()=>{
    Logger.info("Mongoose default connection disconnected through app termination")
  })
  process.exit(0)
})


export const connection = mongoose.connection