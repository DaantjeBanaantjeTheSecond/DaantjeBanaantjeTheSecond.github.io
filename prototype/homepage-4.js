var images, titles, colors, types;
var books = document.querySelector(".books");
var oldShownBook;
var art = true,
    sal = true,
    kun = true,
    ten = true,
    col = true;
var browsing = false;
var options = document.querySelector(".options");
var toggles = document.querySelectorAll(".toggle");
var arrowLeft = document.querySelector(".arrowLeft");

addBookRows(43);

var firstArticle = document.querySelectorAll(".bookRow")[0];
var otherArticles = document.querySelectorAll(".bookRow");

firstArticle.style.width = "100vw";
firstArticle.childNodes[0].childNodes[1].style.opacity = "0";
firstArticle.childNodes[0].childNodes[0].style.filter = "none";

for (var i = 1; i < otherArticles.length; i++) {
    otherArticles[i].style.width = "25px";
}

function update() {
    if (
        document.body.scrollWidth - document.body.scrollLeft ===
        document.body.clientWidth
    ) {
        addBookRows(10);
    }

    if (document.body.scrollLeft === 0) {
        if (browsing) {
            arrowLeft.style.left = "-25px";
            options.style.right = "-300px";
            otherArticles = document.querySelectorAll(".bookRow");
            if (firstArticle.childNodes.length > 1) {
                firstArticle.childNodes[1].childNodes[1].style.opacity = "0";
                firstArticle.childNodes[1].childNodes[0].style.filter = "none";
            }
            firstArticle.style.width = "calc(100vw - 236.39px - 50px)";
            for (var i = 1; i < otherArticles.length; i++) {
                if (otherArticles[i].style.width != "0px")
                    otherArticles[i].style.width = "25px";
                else otherArticles[i].style.width = "0px";
            }
        }
        browsing = false;
    } else {
        if (!browsing) {
            arrowLeft.style.left = "25px";
            options.style.right = "25px";
            if (firstArticle.childNodes.length > 1) {
                firstArticle.childNodes[1].childNodes[1].style.opacity = "1";
                firstArticle.childNodes[1].childNodes[0].style.filter =
                    "grayscale(100%)";
            }
            for (var i = 0; i < otherArticles.length; i++) {
                if (otherArticles[i].style.width != "0px")
                    otherArticles[i].style.width = "250px";
            }
        }
        browsing = true;
    }

    for (var i = 0; i < books.children.length; i++) {
        var b = books.children[i];
        if (b.scrollTop === 0 &&
            b.clientWidth > 0) {
            addBook(b, "up");
        }
        if (b.scrollHeight - b.scrollTop === b.clientHeight &&
            b.clientWidth > 0) {
            console.log("down");
        }
    }
}

setInterval(update, 10);

function addBookRows(count) {
    for (var i = 0; i < count; i++) {
        var book = newBook(i);

        var bookRow = document.createElement("div");
        bookRow.className = "bookRow";
        bookRow.Category = book.childNodes[3].innerHTML;
        bookRow.append(book);

        books.append(bookRow);
    }
}

function addBook(bookRow, side) {
    var book = newBook();
    if (side == "up") bookRow.prepend(book);
    else bookRow.append(book);
}

function newBook(I) {
    var choices = [];
    if (art) choices.push(0);
    if (sal) choices.push(1);
    if (kun) choices.push(2);
    if (ten) choices.push(3);
    if (col) choices.push(4);
    var typeID = choices[Math.floor(Math.random() * choices.length)];
    if (typeID == undefined) return;
    var imageID = Math.floor(Math.random() * 43);
    if (I != null) imageID = I;

    var book = document.createElement("div");
    book.className = "book";
    book.addEventListener("click", function () {
        bookClicked(this);
    });
    book.id = imageID;
    book.open = true;

    var image = document.createElement("div");
    image.className = "bookImage";
    image.style.backgroundImage = "url(" + images[imageID].src + ")";

    var color = document.createElement("div");
    color.className = "bookColor";
    color.style.backgroundColor = colors[typeID];

    var title = document.createElement("div");
    title.className = "bookTitle";
    title.innerHTML = titles[imageID];

    var type = document.createElement("div");
    type.className = "bookType";
    type.innerHTML = types[typeID];

    var tijd = document.createElement("div");
    tijd.className = "bookTime";

    var times = [5, 10, 15, 20, 30, 45, 60];
    var time = times[Math.floor(Math.random() * times.length)];
    tijd.innerHTML = time + " min leestijd";

    book.append(image);
    book.append(color);
    book.append(title);
    book.append(type);
    book.append(tijd);

    return book;
}

function artikelen() {
    art = !art;
    enableDisable(0, "artikel", art);
}

function salon() {
    sal = !sal;
    enableDisable(1, "salon", sal);
}

function kunstIsLang() {
    kun = !kun;
    enableDisable(2, "kunst is lang", kun);
}

function tendens() {
    ten = !ten;
    enableDisable(3, "tendens", ten);
}

function college() {
    col = !col;
    enableDisable(4, "college", col);
}

function enableDisable(id, filter, bool) {
    var count = 0;
    if (art) count++;
    if (sal) count++;
    if (kun) count++;
    if (ten) count++;
    if (col) count++;

    if (count <= 0) return;

    if (bool) {
        toggles[id].style.backgroundColor = colors[id];
        toggles[id].style.border = "solid " + colors[id];
        for (var i = 0; i < books.children.length; i++) {
            if (books.children[i].Category == filter) {
                books.children[i].open = true;
            }
        }
    } else {
        toggles[id].style.backgroundColor = "white";
        toggles[id].style.border = "solid black";
        toggles[id].style.borderWidth = "1px";
        for (var i = 0; i < books.children.length; i++) {
            if (books.children[i].Category == filter) {
                books.children[i].open = false;
            }
        }
    }
    for (var i = 0; i < books.children.length; i++) {
        if (books.children[i].open) {
            books.children[i].style.width = "250px";
        } else {
            books.children[i].style.width = "0px";
        }
    }
}

for (var i = 0; i < books.children.length; i++) {
    books.children[i].addEventListener("webkitTransitionEnd", bookTransitionEnd);
    books.children[i].addEventListener("transitionend", bookTransitionEnd);
    books.children[i].addEventListener(
        "webkitTransitionStart",
        bookTransitionStart
    );
    books.children[i].addEventListener("transitionstart", bookTransitionStart);
}

function bookTransitionEnd() {
    if (this.style.width == "0px") {
        this.style.visibility = "hidden";
    }
}

function bookTransitionStart() {
    if (this.style.width != "0px") {
        this.style.visibility = "visible";
    }
}

function goLeft() {
    document.body.scrollLeft =
        document.body.scrollLeft - document.body.clientWidth;
}

function goRight() {
    document.body.scrollLeft =
        document.body.scrollLeft + document.body.clientWidth;
}

//hot fix

enableDisable(0, "artikel", art);
enableDisable(0, "artikel", art);
enableDisable(1, "salon", sal);
enableDisable(1, "salon", sal);
enableDisable(2, "kunst is lang", kun);
enableDisable(2, "kunst is lang", kun);
enableDisable(3, "tendens", ten);
enableDisable(3, "tendens", ten);
enableDisable(4, "college", col);
enableDisable(4, "college", col);

firstArticle.style.width = "100vw";
for (var i = 1; i < otherArticles.length; i++) {
    otherArticles[i].style.width = "25px";
}

document.body.scrollLeft = 0;
firstArticle.style.width = "calc(100vw - 236.39px - 50px)";
for (var i = 1; i < otherArticles.length; i++) {
    otherArticles[i].style.width = "25px";
}

function goToStart() {
    document.body.scrollLeft = 0;
}