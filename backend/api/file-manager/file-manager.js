const router = express.Router();

const loader = require('./loader.js');

router.use('/loader', loader);

module.exports = router;