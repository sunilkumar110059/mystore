import ConnctionDB from '../../admin/db/connection';
import jwt from 'jsonwebtoken';
import orderSchema from '../../admin/schema/orderSchema'

ConnctionDB()


const getOrderHistory = async (req, res) => {
    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(401).json({ error: "You must logged in" });
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const orders = await orderSchema.find({ user: userId }).populate("product.productid")
        return res.status(200).json(orders)
    }
    catch (err) {
        return res.status(401).json({ error: "Order History Processing Fail" })
    }

}

// Swith function start
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getOrderHistory(req, res);
            break;
    }
}