import ConnctionDB from '../../admin/db/connection';
import userSchema from '../../admin/schema/userschema';
import cartSchema from '../../admin/schema/cartschema';
import bcrypt from 'bcryptjs'

ConnctionDB();

// Get Resistration API
const getRegistrationApi = async (req, res) => {
    try {
        const getuser = await userSchema.find()
        res.status(201).json(getuser);
    }
    catch (err) { res.status(400).send(err) }
}


// Post Resistration API
async function postRegistrationApi(req, res) {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return (
                res.status(422).json({
                    servName: !name ? "Please Fill Name Field" : "",
                    servEmail: !email ? "Please Fill Email Field" : "",
                    servPassword: !password ? "Please Fill Password Field" : "",
                })
            )
        }

        const user = await userSchema.findOne({ email })
        if (user) {
            return res.status(422).json({ servEmail: "This Email Already Exit" })
        }
        else {
            // data save for server
            const hashPassword = await bcrypt.hash(password, 12)
            const newUser = await new userSchema({
                name,
                email,
                password: hashPassword
            }).save()

            // get regis id in user
            await new cartSchema({ user: newUser._id }).save()

            return res.status(201).json({ servSuccess: "Registration Success" })
        }
    }

    catch (err) {
        return res.status(400).send(err)
    }
}


// Swith function start
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getRegistrationApi(req, res);
            break;

        case "POST":
            await postRegistrationApi(req, res);
            break;
    }
}
