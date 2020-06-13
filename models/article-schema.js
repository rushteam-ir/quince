let article_schema = new mongoose.Schema({

    title : String,
    category_parent : {
        type : 'ObjectId',
        ref : 'category'
    },
    category_child : {
        type : 'ObjectId',
        ref : 'category'
    },
    describe : String,
    keys : String,
    status : Boolean,
    author : {
        type : 'ObjectId',
        ref : 'user'
    },
    last_edit : String,
    views_number : Number,
    comments_number : Number

})

article_schema.statics = {

    add : async function (article_data, author_id) {

        let find_article = article_model.find({title : article_data.title})

        if(!find_article){

            article_data.author = author_id;
            article_data.views_number= 0;
            article_data.comments_number = 0;
            article_data.last_edit = getCurrentDate();
            article_data.status = true;

            let new_article = new article_model(article_data);
            return await  new_article.save();

        }
        else{

            return null;

        }

    }

}

module.exports = article_model = mongoose.model('article', article_schema);