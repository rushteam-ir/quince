let contact_schema = new mongoose.Schema({

    title : String,
    text : String,
    author : {
        type : 'objectId',
        ref : 'user'
    },
    name : String,
    email : String,
    phone_number : String,
    date : String,
    time : String,
    replies : [{
        text : String,
        date : String,
        time : String,
        author : {
            type : 'objectId',
            ref : 'user'
        }
    }],
    read : {
        type : Boolean,
        default : false
    }

});

contact_schema.statics = {

    add : async function(contact_data){

        contact_data.date = getCurrentDate();
        contact_data.time = getCurrentTime();

        let new_contact = new contact_model(contact_data);
        let result = await new_contact.save();

        return result;

    },

    reply : async function(contact_id, reply_data){

        reply_data.date = getCurrentDate();
        reply_data.time = getCurrentTime();

        return await contact_model.findByIdAndUpdate(contact_id, {$push : {replies : reply_data}});

    },

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

    getContact : async function (contact_id) {

        await contact_model.findByIdAndUpdate(contact_id, {read : true});
        return await contact_model.findById(contact_id).populate('author').exec();

    },


};



module.exports = contact_model = mongoose.model('contact', contact_schema);