import mongoose from "mongoose";

function ConnctionDB() {


    mongoose.connect("mongodb://localhost:27017/mystore")
        .then(() => {
            console.log("Connection is Fullfill")
        }).catch((e) => {
            console.log("No Connection")
        })


}

export default ConnctionDB
