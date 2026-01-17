
// 1. Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const scrollReveal = function() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add("active");
        }
    }
};

window.addEventListener("scroll", scrollReveal);
// Run once on load
scrollReveal();


// 2. Real-time Clock for the Footer
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
    
    // Replace 'Your City' with your actual city
    const timeString = "Your City, " + now.toLocaleString('en-US', options);
    timeDisplay.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();
