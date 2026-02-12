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

/**
 * SMALL FLOATING LIZARD OBJECT
 */
const canvas = document.getElementById('lizard-canvas');
const ctx = canvas.getContext('2d');

// --- SETTINGS FOR A DISCRETE, SMALL LIZARD ---
const numNodes = 9;        // Fewer nodes = shorter body
const segmentLength = 10;   // Shorter distance = smaller size
const headRadius = 5;       // Tiny head
const tailRadius = 1;       // Tiny tail
const lizardColor = '#000000'; // Matches your site text color

let mouse = { x: -100, y: -100 }; // Start off-screen
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

function update() {
    // 1. Head follows cursor
    nodes[0].x = mouse.x;
    nodes[0].y = mouse.y;

    // 2. Body segments drag behind
    for (let i = 1; i < numNodes; i++) {
        const target = nodes[i - 1];
        const current = nodes[i];

        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const angle = Math.atan2(dy, dx);

        // This keeps the joints strictly connected
        current.x = target.x - Math.cos(angle) * segmentLength;
        current.y = target.y - Math.sin(angle) * segmentLength;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Don't draw if the mouse hasn't entered the screen yet
    if (mouse.x < 0) return;

    // Draw the "Skeleton" Line
    ctx.beginPath();
    ctx.strokeStyle = lizardColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5; // Make the line slightly transparent
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let i = 1; i < numNodes; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    ctx.stroke();

    // Draw the Nodes (The Body)
    ctx.globalAlpha = 1.0; 
    for (let i = 0; i < numNodes; i++) {
        // Tapered radius for a lizard shape
        const radius = headRadius - (i * (headRadius - tailRadius) / numNodes);
        
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = lizardColor;
        ctx.fill();
        ctx.closePath();
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();
