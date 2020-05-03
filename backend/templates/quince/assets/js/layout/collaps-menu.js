var dashboard_collaps = document.getElementsByClassName("dashboard_collaps");
var i;

for (i = 0; i < dashboard_collaps.length; i++) {

    dashboard_collaps[i].addEventListener("click", function () {


        var panel = this.nextElementSibling;

        if (panel.style.maxHeight) {

            panel.style.maxHeight = null;

        } else {

            panel.style.maxHeight = panel.scrollHeight + "px";
            
        }
    });
}