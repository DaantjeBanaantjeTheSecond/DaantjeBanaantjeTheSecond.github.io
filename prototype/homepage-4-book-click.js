var oldBook;
var oldBookRow;
var domRect;
var titleRect;
var oldBookRowAfter;
var books = document.querySelector(".books");
var goBackBox = document.querySelector(".goBackBox");
var options = document.querySelector(".options");
var arrowRight = document.querySelector(".arrowRight");
var arrowLeft = document.querySelector(".arrowLeft");

var title;
var originalTitle;
var headerImage;
var color;
var article;

function bookClicked(book) {
    oldBook = book;
    oldBookRow = book.parentElement;
    domRect = oldBookRow.getBoundingClientRect();
    oldBookRowAfter =
        books.childNodes[
            Array.from(books.children).indexOf(book.parentElement) + 1
        ];

    originalTitle = oldBook.children[2];
    titleRect = originalTitle.getBoundingClientRect();
    addReading();
}

function addReading() {
    title = document.createElement("div");
    title.className = "title";
    title.innerHTML = originalTitle.innerHTML;

    title.style.top = titleRect.top;
    title.style.left = titleRect.left;
    title.style.width = titleRect.width;
    title.style.height = titleRect.height;

    headerImage = document.createElement("div");
    headerImage.className = "header";
    headerImage.style.top = domRect.top;
    headerImage.style.left = domRect.left;
    headerImage.style.width = domRect.width;
    headerImage.style.height = domRect.height;

    var image = document.createElement("div");
    image.className = "headerImage";
    image.style.backgroundImage = oldBook.childNodes[0].style.backgroundImage;

    color = document.createElement("div");
    color.className = "bookColor";
    // console.log(oldBook.childNodes[1].style.backgroundColor);
    color.style.backgroundColor = oldBook.childNodes[1].style.backgroundColor;
    color.style.opacity = "1";

    headerImage.append(image);
    headerImage.append(color);

    article = document.createElement("div");
    article.className = "article";
    article.style.top = domRect.bottom;
    article.style.left = domRect.left;
    article.style.width = domRect.width;

    document.body.append(headerImage);
    document.body.append(article);
    document.body.append(title);

    goBackBox.style.display = "block";

    document.body.style.overflow = "hidden";

    setTimeout(moveTitle, 1);
    setTimeout(moveHeader, 1);
    setTimeout(moveArticle, 1);
    setTimeout(moveArrows, 1);
}

function moveTitle() {
    title.style.top = "25px";
    title.style.left = "125px";
    title.style.width = "calc(100vw - 150px)";
    title.style.height = "200px";
    title.style.fontSize = "2vw";
}

function moveHeader() {
    headerImage.style.top = "0px";
    headerImage.style.left = "125px";
    headerImage.style.width = "calc(100vw - 125px)";
    headerImage.style.height = "200px";
    headerImage.childNodes[0].style.filter = "grayscale(0%)";
    headerImage.childNodes[1].style.opacity = "0";
}

function moveArticle() {
    article.style.top = "200px";
    article.style.left = "125px";
    article.style.width = "calc(100vw - 125px)";
    article.style.height = "calc(100vh - 200px)";
    var div = document.createElement('div');
    div.style.margin = "100px";
    div.innerHTML = texts[oldBook.id].trim();
    article.append(div);
}

function moveArrows() {
    arrowLeft.style.left = "-25px";
    arrowRight.style.top = "150px";
    arrowRight.setAttribute('onclick', 'goBack()');
}

function goBack() {
    title.style.top = titleRect.top;
    title.style.left = titleRect.left;
    title.style.width = titleRect.width;
    title.style.height = titleRect.height;
    title.style.fontSize = "150%";

    headerImage.style.top = domRect.top;
    headerImage.style.left = domRect.left;
    headerImage.style.width = domRect.width;
    headerImage.style.height = domRect.height;

    if (document.body.scrollLeft === 0) {
        headerImage.childNodes[0].style.filter = "grayscale(0%)";
        headerImage.childNodes[1].style.opacity = "0";
    } else {
        headerImage.childNodes[0].style.filter = "grayscale(100%)";
        headerImage.childNodes[1].style.opacity = "1";
    }

    article.style.top = domRect.bottom;
    article.style.left = domRect.left;
    article.style.width = domRect.width;
    article.style.height = "0px";

    if (document.body.scrollLeft === 0) arrowLeft.style.left = "-25px";
    else arrowLeft.style.left = "25px";
    arrowRight.style.top = "50%";
    arrowRight.setAttribute('onclick', 'goRight()');

    goBackBox.style.display = "none";

    document.body.style.overflowX = "scroll";
    document.body.style.overflowY = "hidden";

    setTimeout(function () {
        title.remove();
        headerImage.remove();
        article.remove();
    }, 1000);
}