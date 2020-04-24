module.exports = class {

    constructor(options) {

        this.file = options.file;
        this.allowed_formats = options.allowed_formats;
        this.limited_size = options.limited_size;
        this.file_path = options.file_path;

    }

    upload() {

        for(let key in this.file){

            let file_format = key.name.split('.').pop();

            if(this.allowed_formats.includes(file_format)){

                if(key.size/1024 <= this.limited_size){

                    key.mv(this.file_path, (err)=>{

                        if(err){

                            throw err;

                        }
                        else{

                            return  '';

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


}