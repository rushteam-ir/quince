const router = express.Router();

const content_load = require('./content-load.js');
const download_file = require('./download-file.js');
const delete_file = require('./delete-file.js');
const delete_select = require('./delete-select.js');

router.use('/content-load', content_load);
router.use('/download-file', download_file);
router.use('/delete-file', delete_file);
router.use('/delete-select', delete_select);

module.exports = router;