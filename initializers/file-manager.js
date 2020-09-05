const path = require('path')

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

        let file_extension = path.extname(file);

        if(options.allowed_formats.includes(file_extension) || options.allowed_formats[0] == '*'){

            if(file.size/1024 <= limited_size){

                file.mv(options.file_path + `/${file_name}`, (err)=>{

                    if(err){

                        return 'آپلود فایل با مشکل مواجه شد.';

                    }
                    else{

                        return null;

                    }

                });

            }
            else{

                return 'سایز فایل انتخابی بیشتر از حد مجاز است.'

            }

        }
        else{

            return 'نوع فایل انتخابی معتبر نمی باشد.'

        }

    }

    delete(file_path){

        fs.unlink(file_path, function(err) {

            if(err){

                log(err)

            }

        })

    }

    getPathContent(file_path){

        return new Promise((resolve, reject)=>{

            fs.readdir(file_path, (err, files)=>{

                if(err){

                    reject(err);

                }
                else{

                    let promise_array = []

                    for(let file_name of files){
                        promise_array.push(this.getPathDetail(file_path + file_name));
                    }

                    Promise.all(promise_array).then((content)=>{

                        resolve(content)

                    })

                }

            })

        })

    }

    getPathDetail(file_path){

        return new Promise((resolve, reject)=>{

            fs.stat(file_path, (err, stats)=>{

                resolve({

                    name : path.basename(file_path),
                    size : this.getSize(stats.size),
                    isFile : stats.isFile(),
                    modified : JalaliDate.toJalali(stats.ctime),
                    created : stats.mtime,
                    type : path.extname(file_path)

                });

            });

        })

    }

    getSize(size){

        let result;

        if(size < 1024){
            result = size + ' B';
        }
        else if(size < 1024*1024){
            result = (size/1024).toFixed(2) + ' KB';
        }
        else if(size < 1024*1024*1024){
            result = (size/1024/1024).toFixed(2) + ' MB';
        }
        else{
            result = (size/1024/1024/1024).toFixed(2) + ' GB';
        }

        return result;

    }

}

module.exports = new fileManager()