const router = express.Router();

const get_page_limit = require('./get-page-limit');

router.use('/get-page-limit', get_page_limit);

module.exports = router;