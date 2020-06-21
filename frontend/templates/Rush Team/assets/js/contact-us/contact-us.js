
var coll_content = document.getElementsByClassName("repetitive_questions_box");

for (var i = 0; i < coll_content.length; i++) {

    coll_content[i].addEventListener("click", function() {

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {

            content.style.maxHeight = null;

        } else {

            content.style.maxHeight = content.scrollHeight + 'px';

        }

    });

}
