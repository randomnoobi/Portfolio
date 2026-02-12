/**
 * 1. SCROLL REVEAL ANIMATION
 * Makes projects fade in as you scroll down
 */
const scrollReveal = function() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", scrollReveal);
scrollReveal(); // Run once on load to show items already in view


/**
 * 2. REAL-TIME LOS ANGELES CLOCK
 */
function updateTime() {
    const timeDisplay = document.getElementById("current-time");
    if (!timeDisplay) return;

    const options = { 
        timeZone: 'America/Los_Angeles',
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        month: 'long', 
        day: 'numeric' 
    };
    
    const now = new Date();
    const timeString = now.toLocaleString('en-US', options);
    timeDisplay.textContent = "Los Angeles " + timeString;
}
setInterval(updateTime, 1000);
updateTime();


/**
 * 3. VIDEO HOVER LOGIC (YouTube Style)
 * Plays video on hover, resets to start on mouse leave
 */
const videoItems = document.querySelectorAll('.video-container');

videoItems.forEach(item => {
    const video = item.querySelector('.hover-video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => { /* Auto-play prevented */ });
        }
    });

    item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Resets to beginning
    });
});


