// Scroll Reveal Effect
const scrollReveal = function() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
};

window.addEventListener("scroll", scrollReveal);
scrollReveal(); // Run once on load

// Real-time Clock for Sam Wang's Portfolio
function updateTime() {
    const timeDisplay = document.getElementById("current-time");
    const now = new Date();
    
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Change "Los Angeles" to your preferred city
    const timeString = "Los Angeles " + now.toLocaleString('en-US', options);
    timeDisplay.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();
