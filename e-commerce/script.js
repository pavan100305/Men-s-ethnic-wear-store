window.addEventListener("load", () => {

    setTimeout(() => {
        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        },1000);

    },1500);

});
const btn = document.getElementById("themeBtn");

btn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️ Light Mode";
    } else {
        btn.textContent = "🌙 Dark Mode";
    }
};
const sliders = document.querySelectorAll(".slider-img");

sliders.forEach(slider => {

    // Get array of images from data-images
    const images = JSON.parse(slider.dataset.images);

    let index = 0;

    // Preload all images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    setInterval(() => {

        // Move to next image
        index = (index + 1) % images.length;

        // Fade out current image
        slider.style.opacity = "0";

        // Wait for fade-out animation
        setTimeout(() => {

            // Create temporary image
            const nextImg = new Image();

            nextImg.src = images[index];

            // When the image finishes loading
            nextImg.onload = () => {

                // Change image
                slider.src = nextImg.src;

                // Fade back in
                slider.style.opacity = "1";

            };

            // Handle missing images
            nextImg.onerror = () => {
                console.error("Failed to load:", images[index]);

                // Restore visibility so image doesn't disappear forever
                slider.style.opacity = "1";
            };

        }, 300);

    }, 3000);

});
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach(element => {

    observer.observe(element);

});
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});