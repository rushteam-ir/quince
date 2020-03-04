// MongoDB schema
let setting_schema = new mongoose.Schema({

    website_title : String,
    max_image_upload_size : Number,

});

setting_schema.statics = {



};



module.exports = setting_model = mongoose.model('setting', setting_schema);