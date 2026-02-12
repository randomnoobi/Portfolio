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


/**
 * 4. SMALL FLOATING LIZARD (Black)
 * A discrete procedural following system
 */
const canvas = document.getElementById('lizard-canvas');
const ctx = canvas.getContext('2d');

// Settings for a small, subtle lizard
const numNodes = 18;        
const segmentLength = 10;   
const headRadius = 4;       
const tailRadius = 1;       
const lizardColor = '#000000'; // Black to match your text

let mouse = { x: -100, y: -100 };
let nodes = [];

// Initialize nodes
for (let i = 0; i < numNodes; i++) {
    nodes.push({ x: mouse.x, y: mouse.y });
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updateLizard() {
    nodes[0].x = mouse.x;
    nodes[0].y = mouse.y;

    for (let i = 1; i < numNodes; i++) {
        const target = nodes[i - 1];
        const current = nodes[i];
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const angle = Math.atan2(dy, dx);
        current.x = target.x - Math.cos(angle) * segmentLength;
        current.y = target.y - Math.sin(angle) * segmentLength;
    }
}

function drawLizard() {
    // This MUST be clearRect to keep the background transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mouse.x < 0) return;

    // Draw nodes
    for (let i = 0; i < numNodes; i++) {
        const radius = headRadius - (i * (headRadius - tailRadius) / numNodes);
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = lizardColor;
        ctx.fill();
        ctx.closePath();
    }
}

function animate() {
    updateLizard();
    drawLizard();
    requestAnimationFrame(animate);
}
animate();
