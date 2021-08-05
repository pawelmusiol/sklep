import mongoose from 'mongoose'

const BandSchema = new mongoose.Schema({
  name: String,
  country: String,
  img: String,
  genre: String,
  subgenres: [String],
  desc: String
})

export default mongoose.models.Band || mongoose.model('Band', BandSchema)
