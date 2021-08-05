import mongoose from 'mongoose'

const Address = new mongoose.Schema({
  name: String,
  street: String,
  number: String,
  flat: String,
  postal: String,
  city: String,
  phone: String
})

const Payment = {
  Type: Number,
  Price: Number,
  Address: Address,
}

const Delivery = {
  Type: Number,
  Price: Number,
  Address: Address,
}
const CartSchema = new mongoose.Schema({
  userId: String,
  products: [Object],
  createDate: Date,
  updateDate: Date,
  //0 Nie złożone 1 złożone 2 zapłacone 3 wysłane 4 dostarczone
  status: Number,
  payment: Payment,
  delivery: Delivery,
  adress: Address,
})

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)
