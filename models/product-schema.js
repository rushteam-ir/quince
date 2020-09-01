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
    main_image : String,
    internal_files : Array,
    status : Boolean,
    order_status : Boolean,
    comments_status : Boolean,
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
    regular_price : Number,
    sale_price : Number,
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
    score : Number,

});

product_schema.statics = {

};

module.exports = product_model = mongoose.model('product', product_schema);