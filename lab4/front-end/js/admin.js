let pass = prompt('Enter admin password','');
if (pass === 'admiN1337') {
    //Можно оставить только эту строчку
    getAllNews();
} else {
    alert("You haven't got permission to admin page");
}
