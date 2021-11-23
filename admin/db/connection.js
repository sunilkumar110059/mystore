import mongoose from "mongoose";

function ConnctionDB() {

    //  mongodb://localhost:27017/mystore

     // mongodb+srv://mystoredb:<password>@cluster0.8k1dm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    
      // 
    
    
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connection is Fullfill")
        }).catch((e) => {
            console.log("No Connection")
        })


}

export default ConnctionDB
