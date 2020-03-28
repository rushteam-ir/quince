function fadeOut() {

    var main_box_content = document.getElementById('main_box_content');
    var main_field_of_forms = document.getElementById('main_field_of_forms');
    
    main_box_content.classList.add("wow");
    main_box_content.classList.add("fadeOutDown");

    setTimeout(function () {
        main_box_content.style.display = "none";
    }, 1000)

    new WOW().init();

    setTimeout(function(){
        main_field_of_forms.style.display ="block";
    },1200)

}