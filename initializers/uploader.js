module.exports = class {

    constructor(files) {

        this.files = files;
        this.allowed_images = ['png', 'jpeg', 'jpg', 'gif'];

    }

    test() {

        for(let key in this.files){

            if(!Array.isArray(key)){

                let file_format = key.name.split('.').pop();

                if(backend_allowd_avatars.includes(file_format1) || backend_allowd_avatars.includes(file_format2)){

                    if(req.files.avatar.size/1024 <= backend_limited_avatars_size){

                        let avatar = req.files.avatar;
                        let avatar_path = `${backend_upload_dir}avatars/${admin_id.toString()}.png`;
                        avatar.mv(avatar_path, (err)=>{});
                        admin_data.avatar = `${admin_id.toString()}.png`

                    }
                    else{

                        return res.redirect(`${config.backend_url}profile/?msg=limited-avatar`);

                    }


                }

            }

        }

    }


}