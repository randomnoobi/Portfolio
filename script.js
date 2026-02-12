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
 * 4. MULTI-JOINT FOLLOWING "LIZARD" (Canvas Overlay)
 * N circular nodes, fixed distance constraints, head follows mouse.
 */
(() => {
    const canvas = document.getElementById("lizard-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // --- Config ---
    const N = 7;              // number of nodes
    const LINK = 30;           // fixed distance between nodes (px)
    const HEAD_RADIUS = 8;     // node size
    const TAIL_RADIUS = 3;
    const LINE_WIDTH = 3;

    // Colors (simple + clean)
    const LINE_COLOR = "rgba(0,0,0,0.35)";
    const NODE_COLOR = "rgba(0,0,0,0.55)";

    // --- Internal state ---
    const nodes = [];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const head = { x: mouse.x, y: mouse.y };

    // Resize canvas to device pixel ratio (crisp lines)
    function resize() {
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    }
    window.addEventListener("resize", resize);
    resize();

    // Initialize nodes in a line behind the head
    for (let i = 0; i < N; i++) {
        nodes.push({
            x: head.x - i * LINK,
            y: head.y
        });
    }

    // Track mouse (client coordinates match our drawing coordinates)
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Optional: touch support
    window.addEventListener("touchmove", (e) => {
        if (!e.touches || !e.touches[0]) return;
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }, { passive: true });

    // Smooth head movement (feels more "alive" than teleporting)
    const HEAD_SMOOTHING = 0.25; // 0..1 (higher = snappier)

    function update() {
        // 1) Head follows cursor
        head.x += (mouse.x - head.x) * HEAD_SMOOTHING;
        head.y += (mouse.y - head.y) * HEAD_SMOOTHING;

        nodes[0].x = head.x;
        nodes[0].y = head.y;

        // 2) Each child maintains strict fixed distance from its parent
        for (let i = 1; i < N; i++) {
            const parent = nodes[i - 1];
            const child = nodes[i];

            const dx = child.x - parent.x;
            const dy = child.y - parent.y;
            const dist = Math.hypot(dx, dy) || 0.0001;

            // Put child on circle around parent with radius LINK
            // Direction based on child's current position relative to parent.
            const nx = dx / dist;
            const ny = dy / dist;

            child.x = parent.x + nx * LINK;
            child.y = parent.y + ny * LINK;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw segments
        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < N; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
        ctx.stroke();

        // Draw nodes (head slightly bigger, tail smaller)
        ctx.fillStyle = NODE_COLOR;
        for (let i = 0; i < N; i++) {
            const t = i / (N - 1);
            const r = HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t;

            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Tiny "nose" dot to suggest direction (optional, subtle)
        const nose = nodes[0];
        const next = nodes[1] || nodes[0];
        const ndx = nose.x - next.x;
        const ndy = nose.y - next.y;
        const nlen = Math.hypot(ndx, ndy) || 0.0001;
        const ux = ndx / nlen, uy = ndy / nlen;

        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath();
        ctx.arc(nose.x + ux * 10, nose.y + uy * 10, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }
    loop();
})();
