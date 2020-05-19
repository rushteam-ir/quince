const router = express.Router();

const get_page_limit = require('./get-page-limit');
const search_engine = require('./search-engine');

router.use('/get-page-limit', get_page_limit);
router.use('/search-engine', search_engine);

module.exports = router;