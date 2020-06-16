const router = express.Router();

const get_page_limit = require('./get-page-limit');
const web_closed = require('./web-closed');
const wysiwyg_image_uploader = require('./wysiwyg-image-uploader');
const wysiwyg_file_uploader = require('./wysiwyg-file-uploader');
const wysiwyg_video_uploader = require('./wysiwyg-video-uploader');
const wysiwyg_delete = require('./wysiwyg-delete');

router.use('/get-page-limit', get_page_limit);
router.use('/web-closed', web_closed);
router.use('/wysiwyg-image-uploader', wysiwyg_image_uploader);
router.use('/wysiwyg-file-uploader', wysiwyg_file_uploader);
router.use('/wysiwyg-video-uploader', wysiwyg_video_uploader);
router.use('/wysiwyg-delete', wysiwyg_delete);

module.exports = router;