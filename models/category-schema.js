// MongoDB schema
let category_schema = new mongoose.Schema({

    title : String,
    parent : {
        type : 'ObjectId',
        ref : 'category'
    },
    child_number : Number,

});

category_schema.statics = {

    add : async function (title_inp, parent_inp) {

        let list = await category_model.find();
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

        let find_cat = await category_model.findOne({title : title_inp, parent : parent});

        if(!find_cat){

            if(parent_inp != '0'){

                await category_model.findByIdAndUpdate(parent_inp, { $inc: {child_number : 1 } });

            }
            else{

                new_category.child_number = 0;

            }

            let new_cat = new category_model(new_category);
            return await new_cat.save();

        }
        else{

            return null;

        }

    },

    getParent : async function () {

        return await category_model.find({

            parent : null

        });

    },

    getSub : async function (parent_id) {

        return await category_model.find({

            parent : parent_id

        });

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let category_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = category_skip + 1;
        result.list =  await category_model.find().skip(category_skip).limit(page_limit).populate('parent').exec();
        result.total_pages = Math.ceil(await category_model.find().countDocuments() / page_limit);

        return result;

    },

    del : async function (category_id) {

        let parent_inp = await category_model.findById(category_id);

        if(parent_inp.parent != null){

            await category_model.findByIdAndUpdate(parent_inp.parent._id, { $inc: {child_number : -1 } });

        }

        return await category_model.findByIdAndDelete(category_id);

    },

    search : async function (search_value, page_number, page_limit) {

        let find_list = await category_model.find().populate('parent').exec();
        let category_skip = page_number * page_limit - page_limit;
        let search_list = [];
        let result = {};

        for(let i = 0; i < find_list.length; i++){

            let title = find_list[i].title.toLowerCase();
            let parent_title = "دسته اصلی";

            if(find_list[i].parent != null){

                parent_title = find_list[i].parent.title.toLowerCase();

            }
            if(title.includes(search_value.toLowerCase()) || parent_title.includes(search_value.toLowerCase())){

                search_list.push(find_list[i]);

            }

        }

        result.rows_begin_number = category_skip + 1;
        result.list = search_list.slice(category_skip, page_limit + category_skip);
        result.total_pages = Math.ceil(search_list.length / page_limit);

        return result;

    },

    edit : async function (category_id, title_inp, parent_inp) {

        let this_category = await category_model.findById(category_id)

        let parent = parent_inp;

        if(parent_inp == '0'){

            parent = null;

        }
        else if(parent_inp == '-1'){

            parent = this_category.parent

        }

        let find_cat = await category_model.findOne({title : title_inp, parent : parent});

        if(this_category._id != parent) {

            if (!find_cat) {

                await category_model.findByIdAndUpdate(parent, {$inc: {child_number: 1}});

                if (this_category.parent) {

                    await category_model.findByIdAndUpdate(this_category.parent, {$inc: {child_number: -1}});

                } else if(parent_inp != '-1') {

                    await category_model.updateMany({parent: this_category._id}, {parent: null, child_number: 0})

                }

                return await category_model.findByIdAndUpdate(category_id, {
                    title: title_inp,
                    parent: parent,
                });

            } else {

                return null

            }

        }
        else{

            return null

        }

    },

};



module.exports = category_model = mongoose.model('category', category_schema);