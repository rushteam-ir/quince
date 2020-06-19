(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
    });

})();

$(document).ready(function () {

    // show img when browse
    $(".input-file-custom").change(function () {

        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"> <div class="remove_img_icon remove"></div></div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }

    });

});

$(document).on('click', '.remove', function (e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});

function redirect(url) {
    location.href = url
}

// Get Sub Categories
$(document).ready(function () {

    $('.select-category').change(function () {

        $('.select-sub-category').find('option').remove()
        let parent_id = $(this).val();
        if(parent_id != ""){
            let p = {"id":parent_id};
            $.get(`${backend_url}category/api/get-sub-category`, p, function (data) {

                $('#select-sub-category').find('option:gt(0)').remove();
                for(let i = 0; i < data.length; i++){

                    let opt = '<option value="' + data[i]._id + '">' + data[i].title + '</option>';
                    $('.select-sub-category').append(opt);
                }

            })

        }
        else{

            $('.select-sub-category').find('option:gt(0)').remove();

        }
    })
});