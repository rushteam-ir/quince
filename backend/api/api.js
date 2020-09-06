const router = express.Router();

const get_page_limit = require('./get-page-limit');
const wysiwyg_file_manager = require('./wysiwyg-file-manager');
const get_reports = require('./get-reports');
const file_manager = require('./file-manager/file-manager');

router.use('/get-page-limit', get_page_limit);
router.use('/wysiwyg-file-manager', wysiwyg_file_manager);
router.use('/get-reports', get_reports);
router.use('/file-manager', file_manager);

module.exports = router;