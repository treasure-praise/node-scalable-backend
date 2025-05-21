import mongoose, { Document, Model, Schema } from "mongoose"
import bcrypt from 'bcrypt-ts';

export interface UserDoc extends Document{
  name?:string,
  email?:string,
  password?:string,
  matchPasswords?: (enteredPassword:string)=> Promise<boolean>
}

export interface UserModel extends Model<UserDoc>{
  matchPasswords?: (enteredPassword:string)=> Promise<boolean>
}

const userSchema = new Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword:string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  if (!this.password) {
    throw new Error("Password is undefined");
  }
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User
