let product_schema = new mongoose.Schema({

    title : String,
    unique_id : String,
    category_parent : {
        type : 'objectId',
        ref : 'category'
    },
    category_child : {
        type : 'objectId',
        ref : 'category'
    },
    summary : String,
    describe : String,
    meta_describe : String,
    type : Number,
    tax_status : Boolean,
    main_image : String,
    internal_files : Array,
    status : Number,
    comments_status : {
        type : Boolean,
        default : true
    },
    author : {
        type : 'objectId',
        ref : 'user'
    },
    last_edit : String,
    views_number : {
        type : Number,
        default : 0
    },
    comments_number : {
        type : Number,
        default : 0
    },
    tags : Array,
    url : String,
    monetary_unit : String,
    regular_price : Number,
    sale_price : Number,
    sale_date_start : String,
    sale_date_end : String,
    stock : {
        type : Number,
        default : 0
    },
    max_order : Number,
    gallery : Array,
    weight : Number,
    length : Number,
    width : Number,
    height : Number,
    code : String,
    score : {
        type : Number,
        default : 0
    },
    attributes : [{
        title : String,
        describe : String,
    }],
    downloadable_files : [{
        title : String,
        describe : String,
        link : String
    }],
    variations : [{
        title : String,
        values : Array,
    }]


});

product_schema.statics = {

    add : async function(product_data){

        let find_product = await product_model.findOne({url : prodcut_data.url});
        let new_id = randomSha1String();

        if(!find_product){

            product_data.last_edit = getCurrentDate();
            product_data.unique_id = new_id;

            await user_model.findByIdAndUpdate(prodcut_data.author, {$inc : {products_number : 1}})

            let new_product = new product_model(new_product);
            return await new_product.save();

        }
        else{

            return null;

        }

    }

};

module.exports = product_model = mongoose.model('product', product_schema);