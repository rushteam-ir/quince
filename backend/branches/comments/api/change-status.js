const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let comment_id = req.query.id;
        let back_url = req.header('Referer') || '/';

        if(isObjectId(comment_id)){

            let result = await comment_model.changeStatus(comment_id);

            if(result){

                return res.redirect(back_url);

            }
            else{

                return res.redirect(back_url);

            }

        }
        else{

            return res.redirect(back_url);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;