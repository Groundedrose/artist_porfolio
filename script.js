set = 1;
document.addEventListener("DOMContentLoaded", function () {
    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            const gallery = document.getElementById("gallery");
            images.forEach((image, index) => {
                const col = document.querySelector('.set-' + set)
                const img = document.createElement("img");
                const title = document.querySelector("#imageModalLabel");
                const description = document.querySelector("#description");
                img.src = image.url;
                img.className = "img-thumbnail";
                img.alt = `Image ${index + 1}`;
                img.setAttribute("data-toggle", "modal");
                img.setAttribute('data-num', index);
                img.setAttribute("data-target", "#imageModal");
                img.addEventListener("click", function () {
                    document.getElementById("modalImage").src = this.src;
                    document.getElementById("modalImage").setAttribute('data-num', index)
                    image.title ? title.innerHTML = image.title : title.innerHTML = '';

                    image.description ? description.innerHTML = image.description : description.innerHTML = '';
                });
                col.appendChild(img);
                set++;
                if (set == 4) set = 1;
            });
        })
        .catch(error => console.error('Error fetching the image list:', error));
});
document.addEventListener("DOMContentLoaded", function () {
    fetch('site_attributes.json')
        .then(response => response.json())
        .then(attributes => {
            if (attributes[0].instagram) $('#instagram').attr('href', attributes[0].instagram);
            if (attributes[0].store) $('#store').attr('href', attributes[0].store);
            if (attributes[0].phone) $('#phone').attr('href', 'tel:' + attributes[0].phone);
            if (attributes[0].email) $('#email').attr('href', 'mailto:' + attributes[0].email);
            if (attributes[0].title) document.title = attributes[0].title;
            if (attributes[0].name) $('#name').text(attributes[0].name);
            if (attributes[0].background_color) $('.header').css('background-color', attributes[0].background_color);
            if (attributes[0].portrait) $('#portrait').attr('src', attributes[0].portrait);
            if (attributes[0].bio) $('#bio').text(attributes[0].bio);
        })
        .catch(error => console.error('Error fetching the attributes list:', error));
});

$('.modal-arrow').on('click', function change_direction() {
    const current_index = parseInt($('#modalImage').attr('data-num'));
    let direction = 0;
    $(this).hasClass('arrow-right') ? direction = 1 : direction = -1;
    const title = document.querySelector("#imageModalLabel");
    const description = document.querySelector("#description");
    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            images.forEach((image, index) => {
                if (index == current_index + direction) {
                    $('#modalImage').attr('data-num', current_index + direction);
                    document.getElementById("modalImage").src = image.url;
                    image.title ? title.innerHTML = image.title : title.innerHTML = '';
                    image.description ? description.innerHTML = image.description : description.innerHTML = '';
                    return true;
                }
            })
        });

})

$(window).keyup(function (e) {
    var key = e.which;
    if (key == 13 || key == 39) { // the enter key code or right arrow
        $('.next').click();
        return false;
    } else if (key == 37) { // left arrow
        $('.prev').click();
        return false;
    }
});