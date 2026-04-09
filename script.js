/**
 * 1. CLOCK & SCROLL REVEAL
 */
function updateTime() {
    const timeDisplay = document.getElementById("current-time");
    if (!timeDisplay) return;
    const now = new Date();
    const options = { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: true, month: 'long', day: 'numeric' };
    timeDisplay.textContent = "Los Angeles " + now.toLocaleString('en-US', options);
}
setInterval(updateTime, 1000);
updateTime();

const scrollReveal = function() {
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
const videoItems = document.querySelectorAll('.video-container');
videoItems.forEach(item => {
    const video = item.querySelector('.hover-video');
    if (!video) return;
    item.addEventListener('mouseenter', () => video.play().catch(()=>{}));
    item.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
});

/**
 * 3. LIZARD SCRIPT (Black lizard on transparent background)
 */
const canvas = document.getElementById('lizard-canvas');
const ctx = canvas.getContext('2d');

const numNodes = 20;
const segmentLength = 8;
const headRadius = 4;
const tailRadius = 0.5;
const lizardColor = '#000000'; // Pure Black

let mouse = { x: -100, y: -100 };
let nodes = [];
for (let i = 0; i < numNodes; i++) nodes.push({ x: mouse.x, y: mouse.y });

window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function animate() {
    // Clear everything so the background stays white
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouse.x > 0) {
        nodes[0].x = mouse.x;
        nodes[0].y = mouse.y;

        for (let i = 1; i < numNodes; i++) {
            const dx = nodes[i-1].x - nodes[i].x;
            const dy = nodes[i-1].y - nodes[i].y;
            const angle = Math.atan2(dy, dx);
            nodes[i].x = nodes[i-1].x - Math.cos(angle) * segmentLength;
            nodes[i].y = nodes[i-1].y - Math.sin(angle) * segmentLength;
        }

        for (let i = 0; i < numNodes; i++) {
            const r = headRadius - (i * (headRadius - tailRadius) / numNodes);
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, r, 0, Math.PI * 2);
            ctx.fillStyle = lizardColor;
            ctx.fill();
        }
    }
    requestAnimationFrame(animate);
}
animate();
