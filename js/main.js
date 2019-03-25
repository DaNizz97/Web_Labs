const canvas = document.createElement('canvas');

let path = 'https://source.unsplash.com/collection/1127180/';
canvas.width = 800;
canvas.height = 800;
var
    ctx = canvas.getContext('2d'),

    img1 = new Image(),
    img2 = new Image(),

    xSize = getRandomInt(150, 450),
    xResize = 300 - (xSize - 300),
    xOffset = xSize - 300,
    ySize = getRandomInt(100, 300),
    yResize = 200 - (ySize - 200),
    yOffset = ySize - 200,
    img3 = new Image(),
    img4 = new Image();

img1.crossOrigin = 'anonymous';
img1.src = path + xSize + 'x' + ySize;


const data = JSON.parse(getQuote());

img1.onload = function () {
    ctx.drawImage(img1, 0, 0);
    fillText()
};


document.body.appendChild(canvas);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function addText() {
    let mas = data[0].quote.split(' ');
    let countOfLines = Math.ceil(mas.length / 9);
    ctx.textAlign = 'center';
    for (var i = 0; i < countOfLines; i++) {
        ctx.fillText(masToString(mas.slice(i * 9, (i + 1) * 9)), 300, 100 + 200 / (countOfLines + 1) * (i + 1))
    }
    ctx.textAlign = 'right';
    ctx.fillText('(c) ' + data[0].character, 590, 380);
}

function fillText() {
    ctx.font = 'Bold 18px Arial';
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, 600, 400)
    ctx.fillStyle = "white";
    addText()
}

function masToString(mas) {
    var str = '';
    for (let i = 0; i < mas.length; i++) {
        str = str + mas[i] + ' '
    }
    return str
}

canvas.onclick = function () {
    var dataURL = canvas.toDataURL("image/jpeg");
    var link = document.createElement("a");
    document.body.appendChild(link); // Firefox requires the link to be in the body :(
    link.href = dataURL;
    link.download = "q.jpg";
    link.click();
    document.body.removeChild(link);
};
