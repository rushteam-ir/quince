// MongoDB schema
let store_schema = new mongoose.Schema({

    title : String,
    category : String,
    sub_category : String,
    describe : String,
    stock : Number,
    discount : Number,
    main_image : String,
    sub_image_1 : String,
    sub_image_2 : String,
    sub_image_3 : String,


});

store_schema.statics = {



};



module.exports = store_model = mongoose.model('store', store_schema);