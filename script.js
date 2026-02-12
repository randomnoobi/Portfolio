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
 * REPTILE FOLLOWING SYSTEM
 */
const canvas = document.getElementById('lizard-canvas');
const ctx = canvas.getContext('2d');

// --- SETTINGS (Adjust these to change the lizard's look) ---
const numNodes = 25;        // Number of segments
const segmentLength = 25;   // Distance between nodes (px)
const headRadius = 12;      // Size of the head
const tailRadius = 3;       // Size of the end of the tail

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let nodes = [];

// Initialize nodes at center
for (let i = 0; i < numNodes; i++) {
    nodes.push({ x: mouse.x, y: mouse.y });
}

// Track mouse movement
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function update() {
    // 1. Head follows mouse cursor
    nodes[0].x = mouse.x;
    nodes[0].y = mouse.y;

    // 2. Each child node follows the preceding node strictly
    for (let i = 1; i < numNodes; i++) {
        const target = nodes[i - 1];
        const current = nodes[i];

        // Calculate vector difference
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        
        // Calculate current distance
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate angle from current node to preceding node
        const angle = Math.atan2(dy, dx);

        // Adjust child node's position to maintain fixed distance
        // It moves current node along the vector until it is exactly segmentLength away
        if (distance !== segmentLength) {
            current.x = target.x - Math.cos(angle) * segmentLength;
            current.y = target.y - Math.sin(angle) * segmentLength;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let i = 1; i < numNodes; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    ctx.stroke();

    // Draw solid circle nodes
    for (let i = 0; i < numNodes; i++) {
        // Taper the radius from head to tail for a "lizard" look
        const radius = headRadius - (i * (headRadius - tailRadius) / numNodes);
        
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
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
