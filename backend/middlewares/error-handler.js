const router = express.Router();

router.use(async(err, req, res, next)=>{

    log('asas');
    log(err);
    next()

})

module.exports = router;
