let category_schema = new mongoose.Schema({

    title : String,
    parent : {
        type : 'ObjectId',
        ref : 'category'
    },
    author : {
        type : 'ObjectId',
        ref : 'user'
    },
    child_number : Number,

});

category_schema.statics = {

    add : async function (admin_id, title_inp, parent_inp) {

        let parent = parent_inp;

        if(parent_inp == '0'){

            parent = null;

        }
        else if(!isObjectId(parent_inp)){

            return -1;

        }

        let new_category = new category_model({

            title : title_inp,
            parent : parent,
            author : admin_id

        });

        let find_cat = await category_model.findOne({title : title_inp, parent : parent});

        if(!find_cat){

            if(parent_inp != '0'){

                await category_model.findByIdAndUpdate(parent_inp, { $inc: {child_number : 1 } });

            }

            await user_model.findByIdAndUpdate(admin_id, { $inc: {categories_number : 1 } });

            new_category.child_number = 0;

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

        return await category_model.find({parent : parent_id });

    },

    getCat : async function (category_id) {

        return await category_model.find({_id : category_id }).populate('parent').populate('author').exec();;

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let category_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = category_skip + 1;
        result.list =  await category_model.find().skip(category_skip).limit(page_limit).populate('parent').populate('author').exec();
        result.total_pages = Math.ceil(await category_model.find().countDocuments() / page_limit);

        return result;

    },

    del : async function (category_id) {

        let parent_inp = await category_model.findById(category_id).populate('author');

        if(parent_inp.parent != null){

            await category_model.findByIdAndUpdate(parent_inp.parent._id, { $inc: {child_number : -1 } });

        }
        else{

            await category_model.updateMany({parent: parent_inp._id}, {parent: null, child_number: 0})

        }

        await user_model.findByIdAndUpdate(parent_inp.author._id, { $inc: {categories_number : -1 } });

        return await category_model.findByIdAndDelete(category_id);

    },

    search : async function (query, search_value, page_number, page_limit) {

        let result = {};
        let _skip = page_number * page_limit - page_limit;

        result.rows_begin_number = _skip + 1;
        let _list = await category_model.find(query).populate('parent').populate('author');
        let temp_list = []

        if(search_value){
            for(let index of _list){
                jsonSearch(['title', 'author.nick_name', 'author.first_name', 'author.last_name'], search_value, index) ? temp_list.push(index) : null;
            }
            result.total_pages = Math.ceil(temp_list.length / page_limit);
            result.list = temp_list.slice(_skip, _skip + page_limit).reverse()
        }
        else{
            result.list = _list.slice(_skip, _skip + page_limit).reverse()
            result.total_pages = Math.ceil(await category_model.find(query).countDocuments() / page_limit);
        }
        return result;

    },

    getByAuthor : async function (author_inp, page_number, page_limit) {

        let result = {}
        let _skip = page_number * page_limit - page_limit;

        result.rows_begin_number = _skip + 1;
        result.list =  await category_model.find({author : author_inp}).populate('parent').populate('author').skip(_skip).limit(page_limit).exec();
        result.total_pages = Math.ceil( await category_model.find({author : author_inp}).countDocuments() / page_limit);

        return result;

    },

    edit : async function (category_id, title_inp, parent_inp) {

        let this_category = await category_model.findById(category_id);

        if(parent_inp == '0'){

            parent_inp = null;

        }

        let find_cat = await category_model.findOne({title : title_inp, parent : parent_inp});

        if(!find_cat && parent_inp != this_category._id){

            if(this_category.parent == null){


                if(parent_inp != null){

                    await category_model.updateMany({parent: this_category._id}, {parent: null, child_number : 0});
                    await category_model.findByIdAndUpdate(category_id, {child_number : 0});
                    await category_model.findByIdAndUpdate(parent_inp, {$inc: {child_number: 1}});

                }

            }
            else{

                if(parent_inp != this_category.parent._id){

                    await category_model.findByIdAndUpdate(this_category.parent._id, {$inc: {child_number: -1}});

                }

                if(parent_inp == null){

                    await category_model.findByIdAndUpdate(category_id, {child_number: 0});

                }
                else{

                    if(parent_inp != this_category.parent._id){

                        await category_model.findByIdAndUpdate(parent_inp, {$inc: {child_number: 1}});

                    }

                }

            }

            return await category_model.findByIdAndUpdate(category_id, {title: title_inp, parent: parent_inp});

        }
        else{

            return null;

        }

    },

};



module.exports = category_model = mongoose.model('category', category_schema);