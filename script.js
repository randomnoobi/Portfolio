/**
 * 1. CLOCK
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


/**
 * 2. SCROLL REVEAL
 */
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
 * 3. VIDEO HOVER LOGIC
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


/**
 * 4. LEFT SCROLL PROGRESS BAR
 */
function updateScrollProgress() {
    const progressBar = document.querySelector(".scroll-progress__bar");
    const progressPercent = document.querySelector(".scroll-progress__percent");

    if (!progressBar || !progressPercent) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    progressBar.style.transform = `scaleY(${clampedProgress})`;

    const percent = Math.round(clampedProgress * 100);
    progressPercent.textContent = String(percent).padStart(2, "0");
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
