import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  items: [{ 
    id: String, 
    name: String, 
    price: Number, 
    quantity: Number 
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentMethod: { type: String, required: true },
  shippingAddress: { type: Object },
  stripePaymentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Order || model("Order", OrderSchema);