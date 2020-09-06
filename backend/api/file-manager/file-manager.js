const router = express.Router();

const content_load = require('./content-load.js');

router.use('/content-load', content_load);

module.exports = router;