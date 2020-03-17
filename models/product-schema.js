// MongoDB schema
let product_schema = new mongoose.Schema({

    title : {type : String, unique : true},
    category : String,
    sub_category : String,
    describe : String,
    stock : String,
    price : String,
    discount : String,
    features : Array,
    images : Array,
    purchases : String,
    points : String,
    last_edit : String,
    comments : Array,
    author : String,

});

product_schema.statics = {

    add : async function (product_data) {

        let new_product = new product_model(product_data);
        return await new_product.save();

    }

};



module.exports = product_model = mongoose.model('product', product_schema);