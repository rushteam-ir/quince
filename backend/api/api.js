const router = express.Router();

const get_page_limit = require('./get-page-limit');
const file_manager = require('./file-manager');
const table_manager = require('./table-manager');

router.use('/get-page-limit', get_page_limit);
router.use('/file-manager', file_manager);
router.use('/table-manager', table_manager);

module.exports = router;