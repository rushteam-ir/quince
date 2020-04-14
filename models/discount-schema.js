// MongoDB schema
let discount_schema = new mongoose.Schema({

    code_id : String,
    package_name : String,
    values : Array

});

discount_schema.statics = {

    add : async function (discount_data) {

        let list = await discount_model.find();

        discount_data.status = true;
        discount_data.row = list.length + 1;

        let new_discount = new discount_model(discount_data);
        
        return await new_discount.save();

    },

    del : async function (discount_id) {

        return await discount_model.findByIdAndDelete(discount_id);

    },

    get : async function () {

        return await discount_model.find().sort([['row', -1]]);

    },

    checkId : async function (code_id) {

        return await discount_model.findOne({code_id : code_id});

    },

};



module.exports = discount_model = mongoose.model('discount', discount_schema);