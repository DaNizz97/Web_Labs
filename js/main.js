function getQuote() {
    let response = null;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://thesimpsonsquoteapi.glitch.me/quotes', false);

    xhr.send();
        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            response = xhr.responseText;
            console.log(response);

        }

    return response;
}
