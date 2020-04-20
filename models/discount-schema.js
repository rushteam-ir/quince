// MongoDB schema
let discount_schema = new mongoose.Schema({

    package_name : String,
    code_id : String,
    codes : Array,
    values : Array,
    codes_number : Number,
    codes_active : Number,
    registration_date : String,
    expiration_date : String,
    row : Number

});

discount_schema.statics = {

    add : async function (discount_data) {

        let find_discount = await discount_model.findOne({package_name : discount_data.package_name});

        if(!find_discount){

            let list = await discount_model.find();

            discount_data.row = list.length + 1;
            discount_data.registration_date = getCurrentDate();

            let new_discount = new discount_model(discount_data);

            return await new_discount.save();

        }
        else{

            return null

        }

        return await new_discount.save();

    },

    del : async function (discount_id) {

        return await discount_model.findByIdAndDelete(discount_id);

    },

    get : async function () {

        return await discount_model.find().sort([['row', -1]]);

    },

    getById : async function (discount_id) {

        return await discount_model.findById(discount_id);

    },

    checkId : async function (code_id) {

        return await discount_model.findOne({code_id : code_id});

    },

    checkExpiration : async function () {

        let find_discount = await discount_model.find();

        find_discount.forEach(async(dis)=>{

            if(dis.expiration_date != '0'){

                let expiration_date = JalaliConvert(dis.expiration_date.split('/'));
                let current_date = JalaliConvert(getCurrentDate().split('/'));
                let time_difference = expiration_date.getTime() - current_date.getTime();

                if(time_difference < 0){

                    await discount_model.findByIdAndDelete(dis._id);

                }

            }

        })

    },

};



module.exports = discount_model = mongoose.model('discount', discount_schema);