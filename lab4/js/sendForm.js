let form = document.getElementById('addPost');

form.onsubmit = (e) => {
    e.preventDefault();

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

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            alert("The post has been submitted for review!");
            document.location.href = "./index.html";
            console.log(xhr.responseText)
        }
    }
};
