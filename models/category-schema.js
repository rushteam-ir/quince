// MongoDB schema
let category_schema = new mongoose.Schema({

    title : String,
    parent : {
        type : 'ObjectId',
        ref : 'category'
    }

});

category_schema.statics = {

    add : async function (title_inp, parent_inp) {

        let parent = parent_inp;

        if(parent_inp == '0'){

            parent = null;

        }
        else if(!isObjectId(parent_inp)){

            return -1;

        }

        let new_category = new category_model({

            title : title_inp,
            parent : parent

        });

        return await new_category.save();

    },

    get : async function () {

        return await category_model.find({

            parent : null

        });

    },

    getSub : async function () {

        return await category_model.find();

    }

};



module.exports = category_model = mongoose.model('category', category_schema);