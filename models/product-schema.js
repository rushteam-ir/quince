// MongoDB schema
let productSchema = new mongoose.Schema({

    title : {type : String, unique : true},
    category : String,
    sub_category : String,
    describe : String,
    stock : Number,
    price : Number,
    discount : Number,
    images : Array,
    purchases : Number,
    points : Number,
    last_edit : Date,
    comments : Array,
    author : String,

});

productSchema.statics = {

    add : async function (product_data) {

        let new_product = new product_model({product_data});
        return await new_product.save();

    }

};



module.exports = product_model = mongoose.model('product', productSchema);