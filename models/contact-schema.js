let contact_schema = new mongoose.Schema({

    text : String,
    author : {
        type : 'objectId',
        ref : 'user'
    },
    name : String,
    email : String,
    phone_number : String,
    date : String,

});

contact_schema.statics = {

    search : async function (query, search_value, page_number, page_limit) {

        let result = {};
        let _skip = page_number * page_limit - page_limit;

        result.rows_begin_number = _skip + 1;
        let _list = await contact_model.find(query).populate('author');
        let temp_list = []

        if(search_value){
            for(let index of _list){
                jsonSearch(['text', 'name', 'email', 'phone_number', 'author.first_name', 'author.last_name', 'author.nick_name', 'author.email', 'author.phone_number'], search_value, index) ? temp_list.push(index) : null;
            }
            result.total_pages = Math.ceil(temp_list.length / page_limit);
            result.list = temp_list.slice(_skip, _skip + page_limit)
        }
        else{
            result.list = _list.slice(_skip, _skip + page_limit)
            result.total_pages = Math.ceil(await contact_model.find(query).countDocuments() / page_limit);
        }
        return result;

    },

    del : async function (contact_id) {

        return await contact_model.findByIdAndDelete(contact_id);

    },

};



module.exports = contact_model = mongoose.model('contact', contact_schema);