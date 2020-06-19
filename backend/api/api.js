const router = express.Router();

const get_page_limit = require('./get-page-limit');
const wysiwyg_uploader = require('./wysiwyg-uploader');
const wysiwyg_delete = require('./wysiwyg-delete');

router.use('/get-page-limit', get_page_limit);
router.use('/wysiwyg-uploader', wysiwyg_uploader);
router.use('/wysiwyg-delete', wysiwyg_delete);

module.exports = router;