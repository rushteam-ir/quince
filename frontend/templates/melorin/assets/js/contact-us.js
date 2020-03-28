function fadeOut() {

    var main_box_content = document.getElementById('main_box_content');
    main_box_content.classList.add("wow");
    main_box_content.classList.add("fadeOutDown");

    setTimeout(function () {
        main_box_content.style.display = "none";
    }, 1000)

    new WOW().init();

}