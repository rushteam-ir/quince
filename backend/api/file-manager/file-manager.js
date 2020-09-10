const router = express.Router();

const content_load = require('./content-load.js');
const download = require('./download.js');
const _delete = require('./delete.js');

router.use('/content-load', content_load);
router.use('/download', download);
router.use('/delete', _delete);

module.exports = router;