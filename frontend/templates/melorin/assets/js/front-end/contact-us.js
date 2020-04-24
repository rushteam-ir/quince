// collapse js
let toggle_box = document.getElementsByClassName('header_and_angle_field');
let i;

for (i = 0; i < toggle_box.length; i++) {

    toggle_box[i].addEventListener("click", function () {

        let panel = this.nextElementSibling;
        
        if (panel.style.display === "block") {

            panel.style.display = "none";

        } else {

            panel.style.display = "block";
            
        }
    });
}
