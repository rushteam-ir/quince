class fileManager {

    upload(file, file_name, options) {

        let limited_size = 0;
        switch(options.allowed_formats){

            case 'image':
            {

                options.allowed_formats = ['png', 'jpeg', 'jpg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];
                limited_size = config.image_limited_size;
                break;

            }
            case 'other':
            {

                options.allowed_formats = ['*'];
                limited_size = config.other_limited_size;
                break;

            }
            case 'video':
            {

                options.allowed_formats = ['mp4', 'webm', 'ogg', 'mkv'];
                limited_size = config.video_limited_size;
                break;

            }

        }

        let file_extension = this.getExtension(file);

        if(options.allowed_formats.includes(file_extension) || options.allowed_formats[0] == '*'){

            if(file.size/1024 <= limited_size){

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

    delete(file_path){

        fs.unlink(file_path, function(err) {

            if(err){

                log(err)

            }

        })

    }

    loadFiles(file_path){

        return new Promise((resolve, reject)=>{

            fs.readdir(file_path, {withFileTypes : true}, (err, files)=>{

                if(err){

                    reject(err);

                }
                else{

                    resolve(files.filter(dirent => dirent.isFile()).map(dirent => dirent.name));

                }

            })

        })

    }

    loadDirectories(file_path){

        return new Promise((resolve, reject)=>{

            fs.readdir(file_path, {withFileTypes : true}, (err, files)=>{

                if(err){

                    reject(err);

                }
                else{

                    resolve(files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));

                }

            })

        })

    }

    getExtension(file){

        return file.name.split('.').pop();

    }

}

module.exports = new fileManager()