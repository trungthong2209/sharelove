
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';

async function connect(){
try{
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log("Server has been connected to database successfully")
}).catch((err) => {
    console.log("DB failed :"+ err)
});
}catch(error){
  console.log(error);
}
}
module.exports = { connect};