import ConnctionDB from '../../admin/db/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../../admin/schema/userschema';

ConnctionDB();

// Swith function start
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getLoginApi(req, res);
            break;

        case "POST":
            await postLoginApi(req, res);
            break;
    }

}



// Get Login Api
const getLoginApi = async (req, res) => {
    try {
        const cartuser = await userSchema.find()
        res.status(201).json(cartuser);
    }
    catch (err) { res.status(400).send(err) }
}
 
// Post Login Api
async function postLoginApi(req, res) {
    try {
        const { email, password } = req.body
      

        if (!email || !password) {
            return res.status(422).json({
                servEmail: !email ? "Please Fill Email fields" : "",
                servPassword: !password ? "Please Fill Password fields" : "",
            })
        }

        const getMatchUser = await userSchema.findOne({ email })

       if (!getMatchUser) {
            return res.status(404).json({
                servEmail: "Email don't match"
            })
        }

        const matchBcryptPass = await bcrypt.compare(password, getMatchUser.password)
        if (matchBcryptPass) {

            const token = jwt.sign({ userId: getMatchUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            const { name, email, role } = getMatchUser

            res.status(201).json({
                servSuccess: "Login Success",
                servToken: token,
                servUserToken: { name, email, role }
            })
        }
 
        else {
            return res.status(401).json({
                servPassword: "Email and Password don't Match"
            })
        }
    }
    catch (err) {
        return (res.status(400).send(err))
    }
}




