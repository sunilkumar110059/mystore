import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "user" },
    product: [
        {
            quantity: { type: Number, default: 1 },
            productid: { type: ObjectId, ref: "product" }
        },
    ],

    email: {
        type: String,
        required: true,
    },

    totalprice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});


export default mongoose.models.Order || mongoose.model('Order', orderSchema)
