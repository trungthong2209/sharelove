
const infEvent = require('../model/infEvent');
const cloudinary = require('../service/cloudinary');
const requestt = require('request');
const formatAlertCuston = require('./alert/alertReturnHome');

function getFormEdit (req, res, next){
    const id = req.params.id;
    infEvent.getDetail(id)
    .then((doc)=>{
        console.log(doc[0].idUser)
        console.log(req.userId)
        if (doc[0].idUser != req.userId) {return res.status(401).send(formatAlertCuston("Người đăng bài mới có thể chỉnh sửa", '/'))}
        res.render('edit', { event: doc })
    })
}
let eidtEvent = async function (req, res, next) {
  const id = req.params.id;
    const allowedExt = /png|jpeg|jpg|gif/;
    const option_image = {
        folder: 'image', 
        format: 'png',
        transformation: [
       { 
         width: 600, 
         crop: "scale" 
       },
       {  quality: "100" }
     ]}
     
  infEvent.findById(id, async function (err, event) {
    if (event) {
        const address_1 = req.body.wards + " " + req.body.district + " " + req.body.city + " Việt Nam";
        console.log(address_1)
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address_1) + '.json?access_token=' + process.env.API_mapbox + '&limit=1';
        requestt({ url: url, json: true }, async function (error, response) {
            if (error) {
              console.log(error)
              console.log('Lỗi ở đây')
              //callback('Unable to connect to Geocode API', undefined);
            }
            else {
              const InfEvent = ({
                purpose: req.body.title,
                address_City: req.body.city,
                address_District: req.body.district,
                address_Ward: req.body.wards,
                address_stress: req.body.stress,
                time: req.body.picker,
                date: req.body.date,
                description: req.body.description,        
                location: {
                  type: 'Point',
                  coordinates: [ response.body.features[0].center[0], response.body.features[0].center[1] ],
                  formattedAddress: response.body.features[0].place_name
                },
                user_joinEvent:req.userId ,
              })
              if (!req.files || Object.keys(req.files).length === 0){
                event.updateOne(InfEvent).then(()=>{
                    return res.status(401).send(formatAlertCuston("Chỉnh sửa thành công", '/home'))
                })
                .catch(error => { res.status(400).send('Error' + error) })
              }
              else {
                if (req.files.image != undefined) {
                    const image = req.files.image;
                    if (!allowedExt.test(image.name)) { return res.status(400).send(formatAlert('Tiện ích không được hỗ trợ')) }
                    else {
                      const result = await cloudinary.uploader.upload(image.tempFilePath, option_image)
                      const data = {
                        image_url: result.secure_url,
                        multiple_image: result.public_id
                      }
                      InfEvent.ID_image = data
                }
                 }
                 if (req.files.image2 != undefined) {
                    const image2 = req.files.image2;
                    if (!allowedExt.test(image2.name)) { return res.status(400).send(formatAlert('Tiện ích không được hỗ trợ')) }
                    else {
                      const result = await cloudinary.uploader.upload(image2.tempFilePath, option_image)
                      const data = {
                        image_url: result.secure_url,
                        multiple_image: result.public_id
                      }
                      InfEvent.ID_image2 = data
                    }
                 }
                 if (req.files.image3 != undefined) {
                    const image3 = req.files.image3;
                    if (!allowedExt.test(image3.name)) { return res.status(400).send(formatAlert('Tiện ích không được hỗ trợ')) }
                    else {
                      const result = await cloudinary.uploader.upload(image3.tempFilePath, option_image)
                      const data = {
                        image_url: result.secure_url,
                        multiple_image: result.public_id
                      }
                      InfEvent.ID_image3 = data
                    }
                 }
                 event.updateOne(InfEvent).then(()=>{
                    return res.status(401).send(formatAlertCuston("Chỉnh sửa thành công", '/home'))
                })  
                .catch(error => { res.status(400).send('Error' + error) })

              }    
            }
          })
    }
    else { res.status(404).json({ message: "Không tìm thấy sự kiện" }) }
  })
}
module.exports = {eidtEvent, getFormEdit};
