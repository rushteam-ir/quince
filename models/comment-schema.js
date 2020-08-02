let comment_schema = new mongoose.Schema({

    text: String,
    status : Boolean,
    date : String,
    time : String,
    email : String,
    name : String,
    groupModel : {
        type : String,
        enum : ['admin', 'user']
    },
    author : {
        type : 'objectId',
        refPath : 'groupModel'
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
    root_id : 'objectId'

});

comment_schema.statics = {

    add : async function(comment_data){

        comment_data.date = getCurrentDate();
        comment_data.time = getCurrentTime();
        comment_data.status = false;

        let new_comment = new comment_model(comment_data);
        let result = await new_comment.save();

        await comment_model.findByIdAndUpdate(result._id, {root_id : result._id});

        return result;

    },

    reply : async function(comment_data, author_id){

        comment_data.date = getCurrentDate();
        comment_data.time = getCurrentTime();
        comment_data.status = false;

        let new_comment = new comment_model(comment_data);
        let result = await new_comment.save();

        await comment_model.findByIdAndUpdate(author_id, {$push : {replies : result._id}});

        return result;

    },

    getAll : async function (page_number, page_limit) {

        let result = {}
        let comment_skip = page_number * page_limit - page_limit;

        result.rows_begin_number = comment_skip + 1;
        result.list =  await comment_model.find().skip(comment_skip).limit(page_limit).populate('response').populate('author').populate('reply_to').exec();
        result.total_pages = Math.ceil(await comment_model.find().countDocuments() / page_limit);

        return result;

    },

    getByArticleId : async function(article_id){

        return await comment_model.find({response : article_id, reply_to : {$exists : false}}).populate({path : 'replies', populate : {path : 'reply_to'}}).exec();

    },

    del : async function (comment_id) {

        let find_comment = await comment_model.findById(comment_id);

        if(find_comment.replies.length != 0){

            for(let index of find_comment.replies){

                await comment_model.findByIdAndDelete(index);

            }

        }

        return await comment_model.findByIdAndDelete(comment_id);

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

        return await comment_model.findById(comment_id).populate('response').populate('author').populate('reply_to').exec();

    },

    edit : async function(comment_data, comment_id){

        return await comment_model.findOneAndUpdate(comment_id, {$set : comment_data}, {new : true});

    }

};



module.exports = comment_model = mongoose.model('comment', comment_schema);