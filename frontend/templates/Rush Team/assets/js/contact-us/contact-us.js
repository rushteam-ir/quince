var coll = document.getElementsByClassName("title_of_collapse");
var i;

for (i = 0; i < coll.length; i++) {

    coll[i].addEventListener("click", function () {

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {

            content.style.maxHeight = null;

        } else {

            content.style.maxHeight = content.scrollHeight + "px";

        }

    });

}