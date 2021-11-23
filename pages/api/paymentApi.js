import cartSchema from '../../admin/schema/cartschema';
import orderSchema from '../../admin/schema/orderSchema'
import Stripe from 'stripe';
import { v4 as uuidV4 } from 'uuid';
import jwt from 'jsonwebtoken';

const stripe = Stripe(process.env.STRIPE_SECRET)

// Swith function start
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await postPaymentApi(req, res);
            break;
    }
}



const postPaymentApi = async (req, res) => {
    const { authorization } = req.headers
    const { paymentInfo } = req.body

    if (!authorization) {
        return res.status(401).json({ error: "You must logged in" });
    }

    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const cartuser = await cartSchema.findOne({ user: userId }).populate("product.productid");

        let totalprice = 0;
        cartuser.product.forEach((items) => {
            totalprice += items.quantity * items.productid.price
        })


        const prevCustomer = await stripe.customers.list({
            email: paymentInfo.email,
        })

        const isExistCustomer = prevCustomer.data.length > 0

        let newCustomer
        if (!isExistCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentInfo.email,
                source: paymentInfo.id
            })
        }

        const charge = await stripe.charges.create({
            currency: "INR",
            amount: totalprice * 100,
            receipt_email: paymentInfo.email,
            customer: isExistCustomer ? prevCustomer.data[0].id : newCustomer.id,
            description: `You purchased a product | ${paymentInfo.email}`
        },
            { idempotencyKey: uuidV4() }
        )

        // save order 
        await new orderSchema({
            user: userId,
            product: cartuser.product,
            email: paymentInfo.email,
            totalprice: totalprice
        }).save()

        // for cart empty 
        await cartSchema.findOneAndUpdate(
            { _id: cartuser._id },
            { $set: { product: [] } }
        )

        return res.status(201).json({ message: "Payment successful" })
    }
    catch (err) {
        return res.status(401).json({ error: "Error Processing Payment" })
    }
}

