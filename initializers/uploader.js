module.exports = class {

    constructor(file, file_name, options) {

        this.file = file;
        this.file_name = file_name;
        this.allowed_formats = options.allowed_formats;
        this.limited_size = options.limited_size;
        this.file_path = options.file_path;

        if(this.allowed_formats == 'image'){

            this.allowed_formats = ['png', 'jpeg', 'jpg', 'gif'];

        }

    }

    upload() {

        let file_format = this.file.name.split('.').pop();

        if(this.allowed_formats.includes(file_format)){

            if(this.file.size/1024 <= this.limited_size){

                this.file.mv(this.file_path + `/${this.file_name}`, (err)=>{

                    if(err){

                        throw err;

                    }
                    else{

                        return null;

                    }

                });

            }
            else{

                return 'limited-size'

            }

        }
        else{

            return 'illegal-file'

        }

    }

}