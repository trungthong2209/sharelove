
const infEvent = require('../model/infEvent');
const cloudinary = require('../middleware/cloudinary');

let DeletePost = async function (req, res, next) {
  var id = req.params.id;
  infEvent.findByIdAndDelete(id, async function (err, event) {
    if (event) {
      if(event.ID_image2.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image2.multiple_image)
      }
      if(event.ID_image3.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image3.multiple_image)
      }
     await cloudinary.uploader.destroy(event.ID_image.multiple_image, async function (err, event) {
        if (err) {
          console.log(err);
          res.json({
            status: "error",
            message: "Xóa ảnh bị lỗi"
          })
        }
        else {
          res.redirect('/home')
        }
      }
      );
    }
    else {
      console.log(err);
      res.json({
        status: "error",
        message: "Không tìm thấy sự kiện"
      });
    }

  })
}
module.exports.DeletePost = DeletePost;
