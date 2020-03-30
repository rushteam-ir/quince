const router = express.Router();

router.get('/', async(req,res)=>{

    let parent_id = req.query.id;
    let sub_category = await category_model.getSub(parent_id);

    res.json(sub_category);

});

module.exports = router;