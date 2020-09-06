const router = express.Router();

const content_load = require('./content-load.js');
const download = require('./download.js');

router.use('/content-load', content_load);
router.use('/download', download);

module.exports = router;