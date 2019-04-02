class Post {
    constructor(news) {
        this._id = news.id;
        this._title = news.title;
        this._body = news.body;
        this._date = news.creation_date;
        this._is_posted = news.is_posted;
        this._user = news.username;
    }


    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get is_posted() {
        return this._is_posted;
    }

    set is_posted(value) {
        this._is_posted = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
}


async function getNews() {
    let result = await sendRequest('GET', 'https://88.201.142.90:8888/slimapp/public/api/news');
    let news = JSON.parse(result);
    createDocumentFrame(news, false)
}

async function getAllNews() {
    let result = await sendRequest('GET', 'https://88.201.142.90:8888/slimapp/public/api/news/all');
    let news = JSON.parse(result);
    createDocumentFrame(news, true)
}

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    })
}

function createDocumentFrame(news, isAdminPage) {
    let container = document.createElement('div');
    container.setAttribute('class', 'container mt-5');
    let post;
    let posts = [];
    for (let prop in news) {
        post = new Post(news[prop]);
        posts.push(post);
        let divColumn = document.createElement('div');
        divColumn.setAttribute('class', 'col-md-12 mt-4');
        let title = document.createElement('h3');
        title.textContent = post.title;
        divColumn.appendChild(title);
        let body = document.createElement('p');
        body.setAttribute('class', 'paragraph');
        body.textContent = post.body;
        divColumn.appendChild(body);
        let divWithDateAndUsername = document.createElement('div');
        let date = document.createElement('span');
        date.setAttribute('class', 'badge');
        date.textContent = 'posted ' + post.date;
        let spanUsername = document.createElement('span');
        spanUsername.setAttribute('class', 'float-right badge');
        spanUsername.setAttribute('id', 'username');
        spanUsername.textContent = 'by ' + post.user;
        divWithDateAndUsername.appendChild(date);
        divWithDateAndUsername.appendChild(spanUsername);

        if (isAdminPage)
            addAdminButtons(divWithDateAndUsername, post);

        divWithDateAndUsername.appendChild(document.createElement('hr'));
        divColumn.appendChild(divWithDateAndUsername);
        container.appendChild(divColumn);
    }
    console.log(posts);
    document.body.appendChild(container);
}

function addAdminButtons(divWithDateAndUsername, post) {
    let span = divWithDateAndUsername.lastChild;
    span.setAttribute('class', 'badge');
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger float-right');
    deleteButton.onclick = async () => {
        await sendRequest('DELETE', 'http://localhost:8081/slimapp/public/api/news/delete/' + post.id);
        document.body.removeChild(document.body.children[document.body.childElementCount - 1]);
        getAllNews();
    };
    deleteButton.textContent = 'Delete';
    divWithDateAndUsername.appendChild(deleteButton);
    if (!(post.is_posted > 0)) {
        let publishButton = document.createElement('button');
        publishButton.setAttribute('class', 'btn btn-info float-right mr-3');
        publishButton.textContent = 'Publish post';
        publishButton.onclick = async () => {
            await sendRequest('GET', 'http://localhost:8081/slimapp/public/api/news/publish/' + post.id);
            document.body.removeChild(document.body.children[document.body.childElementCount - 1]);
            getAllNews();
        };
        divWithDateAndUsername.appendChild(publishButton);
    }
}

