import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
      },
    products :[
        {
        type:mongoose.ObjectId,
        ref: "Product",

    }],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String,
        required: true
      },
      userEmail: {
        type: String,
        required: true
      },
      orderDate: {
        type: Date,
        default: Date.now
      },
    status:{
        type: String,
        default: "Not Process",
        enum: ['Pending Payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    }

},{timestamps: true});
export default mongoose.model("Order", orderSchema);