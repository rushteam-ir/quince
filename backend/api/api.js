const router = express.Router();

const get_page_limit = require('./get-page-limit');
const wysiwyg_uploader = require('./wysiwyg-uploader');

router.use('/get-page-limit', get_page_limit);
router.use('/wysiwyg-uploader', wysiwyg_uploader);

module.exports = router;