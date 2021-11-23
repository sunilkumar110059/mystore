import userSchema from '../../admin/schema/userschema';
import jwt from 'jsonwebtoken';


// getCartApi start
const getUserRoleApi = async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "You must logged in" });
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const roleuser = await userSchema.find(
            { _id: { $ne: userId } }
        ).select("-password")

        return res.status(201).json(roleuser)
    }
    catch (err) {
        console.log("err", err)
        return res.status(401).json({ error: "You must logged in" })
    }
}


const updateUserRoleApi = async (req, res) => {
    const { userRoleId, userRole } = req.body
    try {
        const newUserRole = userRole === "user" ? "admin" : "user"
        const updateRole = await userSchema.findOneAndUpdate(
            { _id: userRoleId },
            { role: newUserRole },
            { new: true }
        ).select("-password")
        return res.status(201).json(updateRole)
    }
    catch (err) {
        return res.status(401).json({ error: "You must logged in" })
    }

}


// Swith function start
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getUserRoleApi(req, res);
            break;
        case "PUT":
            await updateUserRoleApi(req, res);
            break;
    }
}
