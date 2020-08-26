const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let contact_id = req.body.id;

        if(isObjectId(contact_id)){

            let comment = await contact_model.getContact(contact_id);

            res.json(comment);

        }
        else{

            return res.redirect(`${config.backend_url}contacts`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;