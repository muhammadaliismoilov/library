   
const {MongoClient} = require("mongodb")
const client = new MongoClient(process.env.MONGO_URI)


const connectDB = async () => {
    try{
        await client.connect()
        console.log("MongoDb database connected Successfuly!");
    }catch(error){
        console.log("Error with connecting to MongoDb:" + error);
        
    }
}

module.exports = {
    client,
    connectDB
}




