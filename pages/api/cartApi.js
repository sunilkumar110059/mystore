import ConnctionDB from '../../admin/db/connection';
import cartSchema from '../../admin/schema/cartschema';
import jwt from 'jsonwebtoken';

ConnctionDB();


export default async (req, res) => {
    switch (req.method) {

        case "GET":
            await getCartApi(req, res);
            break;

        case "PUT":
            await addCartApi(req, res);
            break;

        case "DELETE":
            await deleteCartApi(req, res);
            break;
    }
}


// getCartApi start
const getCartApi = async (req, res) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "You must logged in" });
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const cartuser = await cartSchema.findOne({ user: userId }).populate("product.productid");
        return res.status(201).json(cartuser.product)
    }
    catch (err) {
        return res.status(401).json({ error: "Token key changed you must login" })
    }
}

// addCartApi start
const addCartApi = async (req, res) => {
    const { authorization } = req.headers
    const { quantity, prodId } = req.body

   

    if (!authorization) {
        return res.status(401).json({ error: "You must" });
    }

    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const cartuser = await cartSchema.findOne({ user: userId })
        const prodExits = cartuser.product.some((prod) => prodId === prod.productid.toString())

        console.log("auth", cartuser)

        if (prodExits) {
            await cartSchema.findOneAndUpdate(
                { _id: cartuser._id, "product.productid": prodId },
                { "product.$.quantity": quantity }
            )
        }
        else {
            const newProduct = { quantity, productid: prodId }
            await cartSchema.findOneAndUpdate(
                { _id: cartuser._id },
                { $push: { product: newProduct } }
            )
        }
        return res.status(200).json({ message: "Product add to cart" })
    } catch (err) {
        return res.status(401).json({ error: "You must logged in" })
    }
}


// deleteCartApi start
const deleteCartApi = async (req, res) => {
    const { authorization } = req.headers
    const { prodid } = req.body;


    if (!authorization) {
        return res.status(401).json({ error: "You must" });
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const cartuser = await cartSchema.findOneAndUpdate(
            { user: userId },
            { $pull: { product: { productid: prodid } } },
            { new: true }
        ).populate("product.productid")
        return res.status(200).json(cartuser.product)

    } catch (err) {
        return res.status(401).json({ error: "You must logged in sdfas" })
    }
}
