const mongoose=require("mongoose");
const dotenv=require("dotenv")
dotenv.config();

const connectToMongoDB=async (req,res)=>{
    try{
       
       const mongoURI=process.env.MONGODB_PRODUCTION_URI

        if(!mongoURI) console.log("no mongodb string")


       await mongoose.connect(mongoURI,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
       });
    //    if(mongoURI===process.env.MONGODB_DEVELOPMENT_URI)console.log("connected to local")
       
        console.log("mongoDB atlas connected successfully");
    }catch(error){
        console.log(error)
        console.log("error connecting to mongodb")
    }
}

module.exports=connectToMongoDB
