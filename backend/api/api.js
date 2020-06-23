const router = express.Router();

const get_page_limit = require('./get-page-limit');
const wysiwyg_manager = require('./wysiwyg-manager');
const get_logs = require('./get-logs');

router.use('/get-page-limit', get_page_limit);
router.use('/wysiwyg-manager', wysiwyg_manager);
router.use('/get-logs', get_logs);

module.exports = router;