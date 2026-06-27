/**
 * 1. CLOCK & SCROLL REVEAL
 */
function updateTime() {
    const timeDisplay = document.getElementById("current-time");

    if (!timeDisplay) return;

    const now = new Date();

    const options = {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        month: "long",
        day: "numeric"
    };

    timeDisplay.textContent = "Los Angeles " + now.toLocaleString("en-US", options);
}

setInterval(updateTime, 1000);
updateTime();


const scrollReveal = function () {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", scrollReveal);
scrollReveal();


/**
 * 2. VIDEO HOVER LOGIC
 */
const videoItems = document.querySelectorAll(".video-container");

videoItems.forEach(item => {
    const video = item.querySelector(".hover-video");

    if (!video) return;

    item.addEventListener("mouseenter", () => {
        video.play().catch(() => {});
    });

    item.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});
