var imgs = document.querySelectorAll("img");

var modal = document.createElement("div");
modal.className = "modal";
var modalImg = document.createElement("img");
modalImg.className = "modalImg";
modal.appendChild(modalImg);
document.body.appendChild(modal);

for (var i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
}

modal.onclick = function () {
    modal.style.display = "none";
}