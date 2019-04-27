//Форма для отправки новости
let form = document.getElementById('addPost');

//Обработка нажатия на кнопку сабмит
form.onsubmit = (e) => {
    //прерывание дефолтного поведения
    e.preventDefault();

    //Получение данных из формы и пост запрос на сервер
    let username = document.getElementById('username').value,
        title = document.getElementById('title').value,
        postBody = document.getElementById('body').value,

        requestBody = "username=" + encodeURIComponent(username) +
            "&title=" + encodeURIComponent(title) +
            "&body=" + encodeURIComponent(postBody),
        xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://localhost/slimapp/public/api/news/add');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(requestBody);

    //Сброс значений формы и переход на основную страницу если запрос прошел успешно
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            alert("The post has been submitted for review!");
            document.location.href = "../../../index.html";
        }
    }
};
