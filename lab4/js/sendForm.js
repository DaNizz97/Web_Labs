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
    xhr.open('POST', 'http://88.201.142.90:8888/slimapp/public/api/news/add');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(requestBody);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            // alert("The post has been submitted for review!");
            console.log(xhr.responseText)
        }
    }
};
