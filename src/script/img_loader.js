document.addEventListener("DOMContentLoaded", loadCoverImg);

function loadCoverImg() {
    const img = new Image();
    const cover = document.getElementById('cover-img');
    img.src = 'img/cover.jpg';
    img.decode().then(() => {
        cover.src = img.src;
    });
}