
const infEvent = require('../model/infEvent');
const cloudinary = require('../middleware/cloudinary');
let DeletePost = async function (req, res, next) {
  const id = req.params.id;
  infEvent.findByIdAndDelete(id, async function (err, event) {
    if (event) {
      if (event.email_posted !== req.userId) throw 'Không trùng ID'
      if (event.ID_image2.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image2.multiple_image)
      }
      if (event.ID_image3.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image3.multiple_image)
      }
      if (event.ID_image.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image.multiple_image)
      }
      if (err) { res.status(400).json({ message: "Xóa ảnh bị lỗi" + err }) }
      else { res.redirect('/home') }
    }
    else { res.status(404).json({ message: "Không tìm thấy sự kiện" }) }
  })
}
module.exports.DeletePost = DeletePost;
