// WYSIWYG Editor Options

new FroalaEditor('textarea', {

    imageUploadURL: `${backend_url}api/wysiwyg-uploader`,
    fileUploadURL: `${backend_url}api/wysiwyg-uploader`,
    videoUploadURL: `${backend_url}api/wysiwyg-uploader`,
    events : {
        'image.removed' : function ($img) {

            $.post(`${backend_url}api/wysiwyg-delete`,
                {
                    link_inp : $img.attr('src'),
                    type_inp : 'images'
                },
                function(data, status){});

        },

        'file.unlink' : function (file) {

            $.post(`${backend_url}api/wysiwyg-delete`,
                {
                    link_inp : file.getAttribute('href'),
                    type_inp : 'files'
                },
                function(data, status){});

        },

        'video.removed' : function ($video) {

            $.post(`${backend_url}api/wysiwyg-delete`,
                {
                    link_inp : $video.attr('src'),
                    type_inp : 'videos'
                },
                function(data, status){});

        }
    }

})