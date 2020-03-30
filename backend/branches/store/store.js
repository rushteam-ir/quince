const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let delete_id = req.query.del;
        let status_id = req.query.id;
        let status_value = req.query.status;

        if(!req.query){
            return res.redirect(`${config.backend_url}store/list`)
        }

        if(isObjectId(delete_id)){

            let result = await product_model.del(delete_id);

            if(result){

                let main_image = `${backend_upload_dir}products/${result._id}_main.png`;
                fs.unlinkSync(main_image);

                for(let i = 1; i < result.images.length - 1; i++){
                    let other_image = `${backend_upload_dir}products/${result._id}_${i}.png`;
                    fs.unlinkSync(other_image);
                }

                return res.redirect(`${config.backend_url}store/list/?msg=delete-success`);

            }
            else{

                return res.redirect(`${config.backend_url}store/list/?msg=delete-fail`);

            }

        }
        if(isObjectId(status_id)){

            let result = await product_model.edit(status_id, {status : status_value});

            if(result){
                return res.redirect(`${config.backend_url}store/list/?msg=edit-success`);
            }
            else{
                return res.redirect(`${config.backend_url}store/list/?msg=edit-fail`);
            }

        }

        let data = {

            list : await product_model.get(),

        };

        res.render('store/store-list', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const delete_image = require('./api/delete-image');
const get_features = require('./api/get-features');
const get_images = require('./api/get-images');
const add = require('./add');
const list = require('./list');
const edit = require('./edit');

router.use('/api/delete-avatar', delete_image);
router.use('/api/get_features', get_features);
router.use('/api/get_images', get_images);
router.use('/add', add);
router.use('/list', list);
router.use('/edit', edit);

module.exports = router;