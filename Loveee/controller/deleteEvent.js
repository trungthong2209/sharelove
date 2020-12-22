
const infEvent = require('../model/infEvent');
const room = require('../model/ChatMessage');
const cloudinary = require('../service/cloudinary');
const formatAlert = require('./alert/alert');

let DeletePost = async function (req, res, next) {
  const id = req.params.id;
  infEvent.findById(id, async function (err, event) {
    if (event) {
      if (req.role !== 'ADMIN') {
        if (event.email_posted.toString() !== req.userId) return res.status(401).send(formatAlert("Người đăng bài mới có thể xóa"))
      }
      if (event.ID_image2.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image2.multiple_image)
      }
      if (event.ID_image3.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image3.multiple_image)
      }
      if (event.ID_image.multiple_image !== undefined) {
        await cloudinary.uploader.destroy(event.ID_image.multiple_image)
      }
      event.deleteOne()
        .then(() => {
            room.removeRoom(event)
                .then(() => {
                    res.redirect('/home')
            })
        })
                .catch(err => { res.status(500).json({ message: "Xóa bị lỗi" + err }) })
        .catch(err => { res.status(500).json({ message: "Xóa sự kiện bị lỗi" + err }) })

    }
    else { res.status(404).json({ message: "Không tìm thấy sự kiện" }) }
  })
}
module.exports.DeletePost = DeletePost;
