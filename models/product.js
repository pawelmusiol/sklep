import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: String,
  bandId: String,
  code: String,
  img: [String],
  price: Number,
  promoPrice: Number,
  quantity: Number,
  subgenre:[String],
  releaseDate: Date,
  genre:String,
  category: [String],
  format: String,

})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
