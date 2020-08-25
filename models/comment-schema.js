let comment_schema = new mongoose.Schema({

    text: String,
    status : {
        type : Boolean,
        default : false,
    },
    date : String,
    time : String,
    email : String,
    name : String,
    read : {
        type :  Boolean,
        default: false
    },
    author : {
        type : 'objectId',
        ref : 'user'
    },
    response: {
        type : 'objectId',
        ref : 'article'
    },
    replies : {
        type : [mongoose.Types.objectId],
        ref : 'comment',
        default : []
    },
    reply_to : {
        type : 'objectId',
        ref : 'comment'
    },
    root_id : 'objectId',
    parent_id : {
        type : 'objectId',
        ref : 'comment'
    }

});

comment_schema.statics = {

    add : async function(comment_data){

        comment_data.date = getCurrentDate();
        comment_data.time = getCurrentTime();

        let new_comment = new comment_model(comment_data);
        let result = await new_comment.save();

        await comment_model.findByIdAndUpdate(result._id, {root_id : result._id});
        await article_model.findByIdAndUpdate(result.response, {$inc: {comments_number : 1 }});

        if(comment_data.author){

            await user_mode.findByIdAndUpdate(result.author, {$inc: {comments_number : 1 }})

        }

        return result;

    },

    reply : async function(comment_data, author_id){

        comment_data.date = getCurrentDate();
        comment_data.time = getCurrentTime();

        let new_comment = new comment_model(comment_data);
        let result = await new_comment.save();

        await comment_model.findByIdAndUpdate(author_id, {$push : {replies : result._id}});
        await article_model.findByIdAndUpdate(result.response, {$inc: {comments_number : 1 }});

        if(result.author){

            await user_model.findByIdAndUpdate(result.author, {$inc: {comments_number : 1 }})

        }

        return result;

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let comment_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = comment_skip + 1;
        result.list =  await comment_model.find().skip(comment_skip).limit(page_limit).populate('response').populate('author').populate({path : 'reply_to', populate : {path : 'author'}}).exec();
        result.total_pages = Math.ceil(await comment_model.find().countDocuments() / page_limit);

        return result;

    },

    getByArticleId : async function(article_id){

        return await comment_model.find({response : article_id, reply_to : {$exists : false}}).populate({path : 'replies', populate : {path : 'reply_to'}}).populate({path : 'replies', populate : {path : 'reply_to' , populate : 'author'}}).populate({path : 'replies', populate : {path : 'author'}}).exec();

    },

    del : async function (comment_id) {

        let find_comment = await comment_model.findById(comment_id).populate('replies');

        if(find_comment){

            if(find_comment.replies.length != 0){

                for(let index of find_comment.replies){

                    await comment_model.findByIdAndDelete(index._id);
                    await article_model.findByIdAndUpdate(find_comment.response, {$inc: {comments_number : -1 }});

                    if(index.author){

                        await user_model.findByIdAndUpdate(index.author, {$inc: {comments_number : -1 }})

                    }

                }

            }

            await article_model.findByIdAndUpdate(find_comment.response, {$inc: {comments_number : -1 }});

            if(find_comment.author){

                await user_model.findByIdAndUpdate(find_comment.author, {$inc: {comments_number : -1 }})

            }

            return await comment_model.findByIdAndDelete(comment_id);

        }
        else{
            return null
        }

    },

    changeStatus : async function (comment_id) {

        let find_comment = await comment_model.findById(comment_id);
        let new_status = true;

        if(find_comment.status){

            new_status = false;

        }
        else{

            new_status = true;

        }

        return await comment_model.findByIdAndUpdate(comment_id, {status : new_status})

    },

    getComment : async function(comment_id){

        await comment_model.findByIdAndUpdate(comment_id, {read : true});
        return await comment_model.findById(comment_id).populate('response').populate('author').populate('reply_to').populate({path : 'reply_to', populate : {path : 'author'}}).exec();

    },

    edit : async function(comment_data, comment_id){

        return await comment_model.findByIdAndUpdate(comment_id, {$set : comment_data}, {new : true});

    },

    search : async function (query, search_value, page_number, page_limit) {

        let result = {};
        let _skip = page_number * page_limit - page_limit;

        result.rows_begin_number = _skip + 1;
        let _list = await comment_model.find(query).populate('author').populate({path : 'reply_to', populate : {path : 'author'}});
        let temp_list = []

        if(search_value){
            for(let index of _list){
                jsonSearch(['text', 'name', 'email', 'author.first_name', 'author.last_name', 'author.email', 'author.nick_name'], search_value, index) ? temp_list.push(index) : null;
            }
            result.total_pages = Math.ceil(temp_list.length / page_limit);
            result.list = temp_list.slice(_skip, _skip + page_limit)
        }
        else{
            result.list = _list.slice(_skip, _skip + page_limit)
            result.total_pages = Math.ceil(await comment_model.find(query).countDocuments() / page_limit);
        }
        return result;

    },

    searchId : async function (_id, page_number, page_limit) {

        let _skip = page_number * page_limit - page_limit;
        let result = {
            list : [],
            total_pages : 0,
        }
        result.rows_begin_number = _skip + 1;

        if(!isObjectId(_id)){

            return result;

        }

        result.list = [await comment_model.findById(_id).populate('response').populate('author').populate({path : 'reply_to', populate : {path : 'author'}}).skip(_skip).limit(page_limit).exec()];
        result.total_pages = Math.ceil( await comment_model.findById(_id).countDocuments() / page_limit);

        const index = result.list.indexOf(null);
        if (index > -1) {
            result.list.splice(index, 1);
        }

        return result;

    },

    getNotifications : async function(){

        let find_comments = await comment_model.find({read : false}).sort({date : -1}).populate('author').populate('response').populate({path : 'reply_to', populate : {path : 'author'}});
        let result = {};
        let notification_list = {};

        for(let comment of find_comments){

            if(notification_list.hasOwnProperty(comment.date)){

                notification_list[comment.date].push(comment);

            }
            else{

                notification_list[comment.date] = [comment];

            }

        }

        result.list = notification_list;
        result.count = find_comments.length;

        return result;

    }

};



module.exports = comment_model = mongoose.model('comment', comment_schema);