// WYSIWYG Editor Options

new FroalaEditor('#article_textarea', {

    imageUploadURL: `${backend_url}api/wysiwyg-file-manager`,
    fileUploadURL: `${backend_url}api/wysiwyg-file-manager`,
    videoUploadURL: `${backend_url}api/wysiwyg-file-manager`,
    imageManagerLoadURL: `${backend_url}api/wysiwyg-file-manager`,
    imageManagerDeleteURL : `${backend_url}api/wysiwyg-file-manager`,
    imageUploadParams: {
        do : 'upload'
    },
    fileUploadParams: {
        do : 'upload'
    },
    videoUploadParams: {
        do : 'upload'
    },
    imageManagerLoadParams: {
        do : 'load'
    },
    imageManagerDeleteParams : {
        do : 'delete'
    },
    imageManagerLoadMethod: 'POST',
    imageManagerDeleteMethod : 'POST',

    events : {

        'file.unlink' : function (file) {

            apiFileManager({
                do : 'delete',
                src : file.attr('src')
            })

        },

        'video.removed' : function ($video) {

            apiFileManager({
                do : 'delete',
                src : $video.attr('src')
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