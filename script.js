// 1. Scroll Reveal Animation
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
scrollReveal(); // Run once on load

// 2. Real-time Los Angeles Clock
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
