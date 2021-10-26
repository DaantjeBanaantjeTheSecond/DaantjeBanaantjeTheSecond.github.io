var root = document.documentElement;
var darkModeButton = document.querySelector('.onlineExposition');

setColors();

function setColors() {
    if (getCookie("darkMode") === "true") {
        root.style.setProperty('--text-color', "white");
        root.style.setProperty('--text-highlight-color', "black");
        darkModeButton.innerHTML = "light mode";
        document.querySelector("*").style.font
    } else {
        root.style.setProperty('--text-color', "black");
        root.style.setProperty('--text-highlight-color', "white");
        darkModeButton.innerHTML = "dark mode";
    }
    root.style.setProperty('--background-color-a', Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255);
    root.style.setProperty('--background-color-b', Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255);
    root.style.setProperty('--background-color-c', Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255);
}

function setDarkMode() {
    var darkMode = getCookie("darkMode");
    if (darkMode == "false") {
        setCookie("darkMode", true, 1);
    } else {
        setCookie("darkMode", false, 1);
    }
    setColors();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}