const dotenv = require("dotenv")
const mongoes = require("mongoose")

dotenv.config()
const DB_URL = process.env.DB_URL;

async function connect() {
    try{
        await mongoes.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect successfully");
    }catch(err) {
        console.error(err);
    }
}

module.exports = {connect};