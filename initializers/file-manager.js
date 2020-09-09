class fileManager {

    upload(file, file_name, options) {

        let limited_size = 0;
        switch(options.allowed_formats){

            case 'image':
            {

                options.allowed_formats = ['.png', '.jpeg', '.jpg', '.gif', '.PNG', '.JPG', '.JPEG', '.GIF'];
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

                options.allowed_formats = ['.mp4', '.webm', '.ogg', '.mkv'];
                limited_size = config.video_limited_size;
                break;

            }

        }

        let file_extension = path.extname(file_name);

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

    getPathContent(file_path, root_path, page_number, page_limit){

        return new Promise((resolve, reject)=>{

            fs.readdir(file_path, (err, files)=>{

                if(err){

                    reject(err);

                }
                else{

                    let promise_array = [];

                    for(let file_name of files){
                        promise_array.push(this.getPathDetail(file_path + file_name, root_path, true));
                    }

                    Promise.all(promise_array).then((content)=>{

                        let temp_parent_path_1 = file_path.replace(path.basename(file_path) + '/', '');
                        let temp_parent_path_2 = temp_parent_path_1.replace(/\/\//g, '/');
                        let temp_breadcrumb_2 = file_path.replace(/\/\//g, '/');
                        let skip = page_number * page_limit - page_limit;
                        let content_limited = content.slice(skip, skip + page_limit);

                        if(`${backend_root_dir}/assets/` == temp_parent_path_2){

                            temp_parent_path_2 = ''

                        }

                        resolve({
                            breadcrumb : temp_breadcrumb_2.replace(root_path, ''),
                            parent_directory : temp_parent_path_2.replace(root_path, ''),
                            list : content_limited.sort((a, b)=>{return (a.isFile === b.isFile)? 0 : a? -1 : 1;}),
                            rows_begin_number : skip + 1,
                            total_pages : Math.ceil(content.length / page_limit)
                        });

                    })

                }

            })

        })

    }

    getPathDetail(file_path, root_path, convert_size){

        return new Promise((resolve, reject)=>{

            fs.stat(file_path, (err, stats)=>{

                let new_modified = new JalaliDate(stats.mtime);
                let new_created = new JalaliDate(stats.ctime);

                resolve({

                    name : path.basename(file_path),
                    path : file_path.replace(root_path, ''),
                    size : convert_size ? this.convertSize(stats.size) : stats.size,
                    isFile : stats.isFile(),
                    modified : new_modified.format('YYYY/MM/DD'),
                    created : new_created.format('YYYY/MM/DD'),
                    type : path.extname(file_path)

                });

            });

        })

    }

    getDiskInfo(disk_path){

        return disk((disk_path)).then((diskSpace)=>{

            return {

                size : this.convertSize(diskSpace.size),
                free : this.convertSize(diskSpace.free),

            }

        })

    }

    convertSize(size){

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