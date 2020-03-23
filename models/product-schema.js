// MongoDB schema
let product_schema = new mongoose.Schema({

    title : {type : String, unique : true},
    row : Number,
    category : {type : 'ObjectId', ref : 'category'},
    sub_category : {type : 'ObjectId', ref : 'category'},
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
    author : {type : 'ObjectId', ref : 'admin'},
    status : Boolean

});

product_schema.statics = {

    add : async function (product_data) {

        let list = await product_model.find();
        product_data.row = list.length + 1;

        let new_product = new product_model(product_data);
        return await new_product.save();

    },

    edit : async function (product_id ,product_data) {

        let find_product = await product_model.findByIdAndUpdate(product_id, {$set : product_data}, {new : true});

        if(find_product){

            return find_product;

        }
        else{

            return null;

        }

    },

    get : async function () {

        return await product_model.find().sort([['row', -1]]).populate('category').populate('sub_category');

    },

    del : async function (product_id) {

        return await product_model.findByIdAndDelete(product_id);

    }

};



module.exports = product_model = mongoose.model('product', product_schema);