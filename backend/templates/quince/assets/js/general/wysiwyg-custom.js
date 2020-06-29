// WYSIWYG Editor Options

new FroalaEditor('#article_textarea', {

    imageUploadURL: `${backend_url}api/wysiwyg-file-manager`,
    fileUploadURL: `${backend_url}api/wysiwyg-file-manager`,
    videoUploadURL: `${backend_url}api/wysiwyg-file-manager`,
    imageUploadParams: {
        do_inp : 'upload'
    },
    fileUploadParams: {
        do_inp : 'upload'
    },
    videoUploadParams: {
        do_inp : 'upload'
    },

    events : {
        'image.removed' : function ($img) {

            apiFileManager({
                do_inp : 'delete',
                link_inp : $img.attr('src')
            })

        },

        'file.unlink' : function (file) {

            apiFileManager({
                do_inp : 'delete',
                link_inp : file.attr('src')
            })

        },

        'video.removed' : function ($video) {

            apiFileManager({
                do_inp : 'delete',
                link_inp : $video.attr('src')
            })

        }
    }

})

function apiFileManager(this_data){

    $.post(`${backend_url}api/wysiwyg-file-manager`, this_data, (data, status)=>{

        console.log(status);
        console.log(data);

    });

}