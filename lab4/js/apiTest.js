function getNews() {
    let response = null;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8081/slimapp/public/api/news', false);

    xhr.send();
    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        response = xhr.responseText;
    }

    return response;
}


let container = document.createElement('div');
container.setAttribute('class', 'container mt-5');

let news = JSON.parse(getNews());
for (let i = 0; i < news.length; i++) {
    let divColumn = document.createElement('div');
    divColumn.setAttribute('class', 'col-md-12 mt-4');
    let title = document.createElement('h3');
    title.textContent = news[i].title;
    divColumn.appendChild(title);
    let body = document.createElement('p');
    body.setAttribute('class', 'paragraph');
    body.textContent = news[i].body;
    divColumn.appendChild(body);
    let divWithDateAndUsername = document.createElement('div');
    let date = document.createElement('span');
    date.setAttribute('class', 'badge');
    date.textContent = 'posted ' + news[i].creation_date;
    let spanUsername = document.createElement('span');
    spanUsername.setAttribute('class', 'float-right badge');
    spanUsername.textContent = 'by ' + news[i].username;
    divWithDateAndUsername.appendChild(date);
    divWithDateAndUsername.appendChild(spanUsername);

    divWithDateAndUsername.appendChild(document.createElement('hr'));
    divColumn.appendChild(divWithDateAndUsername);
    container.appendChild(divColumn);
}
document.body.appendChild(container);
