import mongoose, { Document, Schema } from "mongoose"

export interface Todo extends Document{
  user?:string,
  title?:string,
  description?:string,
  status?:string
}

export enum Status{
   NOT_STARTED= "NOT_STARTED",
   IN_PROGRESS= "IN_PROGRESS",
   DONE="DONE"
}

const todoModel = new Schema<Todo> (
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: Status.NOT_STARTED,
      enum: Object.values(Status),
    },
  },
  {
    timestamps: true,
  }
)

const Todo = mongoose.model("Todo", todoModel)

export default Todo
