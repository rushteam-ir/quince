// MongoDB schema
let product_schema = new mongoose.Schema({

    title : String,
    row : Number,
    category : {type : 'ObjectId', ref : 'category'},
    sub_category : {type : 'ObjectId', ref : 'category'},
    describe : String,
    stock : String,
    price : String,
    price_discount : String,
    discount : String,
    features : Array,
    images : Array,
    purchases : String,
    points : String,
    last_edit : String,
    comments : Array,
    author : {type : 'ObjectId', ref : 'user'},
    status : Boolean,
    code : Number

});

product_schema.statics = {

    add: async function (product_data) {

        let can_do = true;
        let list = await product_model.find();
        let new_generated_code = randomInt(100000, 999999);

        while (can_do) {

            let find_product = await product_model.find({code: new_generated_code});

            if (find_product.length == 0) {

                can_do = false;

            } else {

                can_do = true;

            }

        }


        let find_product = await product_model.findOne({title : product_data.title});

        if(!find_product){

            product_data.code = new_generated_code;
            product_data.row = list.length + 1;

            let new_product = new product_model(product_data);
            return await new_product.save();

        }
        else{

            return null

        }

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

        return await product_model.find().sort([['row', -1]]).populate('category').populate('sub_category').populate('author');

    },

    getById : async function (product_id) {

        return await product_model.findById(product_id).populate('category').populate('sub_category').populate('author');

    },

    check : async function (product_code) {

        let result = await product_model.findOne({code : product_code});

        if(result && isObjectId(result._id)){
            return result;
        }
        else{
            return false
        }

    },

    del : async function (product_id) {

        return await product_model.findByIdAndDelete(product_id);

    },

};



module.exports = product_model = mongoose.model('product', product_schema);