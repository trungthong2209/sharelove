
       
const cloudinary = require("cloudinary").v2;

        cloudinary.config({
        cloud_name: "share-love",
        api_key: "556891394267765",
        api_secret: "cD0vmaRxUHX-wcMZ0uNUOH8P6yM"
        });
        
 module.exports = cloudinary;