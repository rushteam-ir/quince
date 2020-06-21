
var coll_content = document.getElementsByClassName("repetitive_questions_box");

for (var i = 0; i < coll_content.length; i++) {
    coll_content[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
