module.exports = fileManager = class {

    upload(file, file_name, options) {

        switch(options.allowed_formats){

            case 'image':
            {

                options.allowed_formats = ['png', 'jpeg', 'jpg', 'gif'];
                break;

            }
            case 'file':
            {

                options.allowed_formats = ['*'];
                break;

            }
            case 'video':
            {

                options.allowed_formats = ['mp4', 'webm', 'ogg', 'mkv'];
                break;

            }

        }

        let file_extension = this.getExtension(file);

        if(options.allowed_formats.includes(file_extension) || options.allowed_formats[0] == '*'){

            if(file.size/1024 <= options.limited_size){

                file.mv(options.file_path + `/${file_name}`, (err)=>{

                    if(err){

                        return 'upload-fail';

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

    async delete(file_path){

        await fs.unlink(file_path, function(err) {

            if(err){

                log(err)

            }

        })

    }

    loadFiles(file_path){

        return new Promise((resolve, reject)=>{

            fs.readdir(file_path, (err, files)=>{

                if(err){

                    reject(err);

                }
                else{

                    resolve(files);

                }

            })

        })

    }

    loadDirectory(file_path){

        return new Promise((resolve, reject)=>{

            fs.stat(file_path, async (err, stats)=>{

                if(err){

                    reject(err)

                }
                else{

                    if(stats.isDirectory()){

                        resolve(true)

                    }
                    else{

                        resolve(false)

                    }

                }

            })

        })

    }

    getExtension(file){

        return file.name.split('.').pop();

    }

}