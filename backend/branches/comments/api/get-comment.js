const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let comment_id = req.body.id;

        if(isObjectId(comment_id)){

            let comment = await comment_model.getComment(comment_id);

            res.json(comment);

        }
        else{

            return res.redirect(`${config.backend_url}comments`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;