
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MongoDB_url;

async function connect() {
  try {
    await mongoose.connect(url || process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(() => {
      console.log("Server has been connected to database successfully")
    }).catch((err) => {
      console.log("DB failed :" + err)
      console.log(url);
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };