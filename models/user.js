import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  mail:String,
  password:String,
  token:String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
