//set dark mode
if (getCookie("darkMode") === "") setCookie("darkMode", true, 1);
setColors();

let projects = document.querySelector(".projects");

let projectsNum = projects.children.length;

let rows = Math.ceil(Math.sqrt(projectsNum));
let cols = Math.ceil(projectsNum / rows);

let w = projects.offsetWidth;
let h = projects.offsetHeight;

let mobile;

let projectSize = 1.0;
let r = 400;
let rotation = 10;

let colScl, rowScl;

let time = 0;

setInterval(function () {
    time += .01;
}, 10);

// functions

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

const dist = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

mobile = window.mobilecheck();

if (!mobile) document.addEventListener('mousemove', look);
else setInterval(function () {
    look({
        clientX: w / 2 + colScl / 2 + w / 4 * Math.cos(time),
        clientY: h / 2 + rowScl / 2 + h / 4 * Math.sin(time)
    });
}, 10);

var projectData = {};

function getProjectData() {
    $.getJSON("data/data.json", function (data) {
        projectData = data;
        loadGrid();
    });

}

function setProjectData(num) {
    projects.children[num].innerHTML = projectData[num].title;
    let img = document.createElement("img");
    img.src = "./data/" + projectData[num].folder + "/displayImg.png";
    projects.children[num].appendChild(img);
    // let title = document.createElement("div");
    // title.className = "title";
    // title.innerHTML = projectData[num].title;
    // projects.children[num].appendChild(title);
    projects.children[num].addEventListener("click", function () {
        location.href = "projects/" + projectData[num].folder + ".html";
    });

}

// end

function loadGrid() {
    //console.log(projectData);
    for (let i = 0; i < projectsNum; i++) {
        setProjectData(i);
        let interval = Math.random() * 2000;
        setTimeout(function () {
            appear(i)
        }, interval);
    }
}

function appear(id) {
    projects.children[id].classList.add('appear');
}

function setGrid() {

    colScl = w / cols;
    rowScl = h / rows;

    for (let j = 0, id = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (id < projectsNum) {
                let a1 = map(i, 0, cols - 1, rotation, -rotation);
                let a2 = map(j, 0, rows - 1, -rotation, rotation);
                let x = map(i, 0, cols - 1, -colScl / 2, w - colScl / 2);
                let y = map(j, 0, rows - 1, -rowScl / 2, h - rowScl / 2);
                let z = -r - 20 * Math.sin(map(i, 0, cols - 1, 0, Math.PI)) -
                    20 * Math.sin(map(j, 0, rows - 1, 0, Math.PI));


                projects.children[id].style.width = colScl * projectSize + "px";
                projects.children[id].style.height = rowScl * projectSize + "px";
                projects.children[id].x = x;
                projects.children[id].y = y;
                projects.children[id].z = z;
                projects.children[id].a1 = a1;
                projects.children[id].a2 = a2;

                projects.children[id].style.transform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
                projects.children[id].style.transform += "rotateY(" + a1 + "deg)";
                projects.children[id].style.transform += "rotateX(" + a2 + "deg)";
            }
            id++;
        }
    }
}

function look(mouse) {
    projects.style.perspectiveOrigin = (50 + map(mouse.clientX, 0, w, 10, -10)) + "%" +
        (50 + map(mouse.clientY, 0, h, 10, -10)) + "%";
    for (let i = 0; i < projectsNum; i++) {
        let x = projects.children[i].x;
        let y = projects.children[i].y;
        let z = projects.children[i].z;
        let a1 = projects.children[i].a1;
        let a2 = projects.children[i].a2;
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let dz = r / map(dist(x, y, mouse.clientX - colScl, mouse.clientY - rowScl), 0, Math.max(vw, vh), 1, 3);
        projects.children[i].style.transform = "translate3d(" + x + "px, " + y + "px, " + (z + dz) + "px)";
        projects.children[i].style.transform += "rotateY(" + a1 + "deg)";
        projects.children[i].style.transform += "rotateX(" + a2 + "deg)";
    }
}

setTimeout(getProjectData, 0);
setGrid();

window.onresize = function updateGrid() {
    w = projects.offsetWidth;
    h = projects.offsetHeight;
    setGrid()
};