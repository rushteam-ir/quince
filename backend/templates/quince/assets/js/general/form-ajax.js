$('.form_ajax').submit(function(event){

    event.preventDefault();

    let post_url = $(this).attr("action");
    let form_data = $(this).serialize();

    console.log(form_data)

    $.post(post_url,
    {
        name: "Donald Duck",
        city: "Duckburg"
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });

});