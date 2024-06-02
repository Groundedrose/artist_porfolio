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
                img.setAttribute("data-target", "#imageModal");
                img.addEventListener("click", function () {
                    document.getElementById("modalImage").src = this.src;
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

        })
        .catch(error => console.error('Error fetching the attributes list:', error));
});