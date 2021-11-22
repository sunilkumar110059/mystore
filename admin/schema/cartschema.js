import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "user"
    },
    product: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            productid: {
                type: ObjectId,
                ref: "product"
            }

        }
    ]

});


export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)
 