let shuffleInterval;
let positions = ['pos-1', 'pos-2', 'pos-3'];
const audio = document.getElementById('bg-music');
const arrow = document.getElementById('audio-arrow');
const replayPopup = document.getElementById('replay-popup');

// Audio Logic & Arrow Handling
window.onload = function() {
    audio.play().then(() => {
        arrow.innerHTML = 'Click to mute <span>➔</span>';
        arrow.classList.remove('hidden');
    }).catch(e => {
        arrow.innerHTML = 'Click to play music <span>➔</span>';
        arrow.classList.remove('hidden');
    });
};

function toggleAudio() {
    const btn = document.getElementById('audio-control');
    arrow.classList.add('hidden');
    if (audio.paused) {
        audio.play();
        btn.innerText = '🔊';
    } else {
        audio.pause();
        btn.innerText = '🔇';
    }
}

audio.addEventListener('ended', () => {
    document.getElementById('audio-control').innerText = '🔇';
    replayPopup.classList.remove('hidden');
});

function playAudioAgain() {
    audio.currentTime = 0;
    audio.play();
    document.getElementById('audio-control').innerText = '🔊';
    replayPopup.classList.add('hidden');
}

// Navigation Logic
function goToStep(stepNumber) {
    if (audio.paused && document.getElementById('audio-control').innerText === '🔊') {
        audio.play().catch(e => console.log("Audio play failed"));
        arrow.classList.add('hidden');
    }

    document.querySelectorAll('.step-container').forEach(step => {
        step.classList.remove('active');
        setTimeout(() => step.classList.add('hidden'), 600);
    });

    if (stepNumber === 2) {
        document.getElementById('btn2').classList.add('hidden');

        setTimeout(() => {
            let typingCompleted = 0;
            const checkDone = () => {
                typingCompleted++;
                if (typingCompleted === 2) {
                    document.getElementById('btn2').classList.remove('hidden');
                }
            };
            typeWriter('source1', 'type1', checkDone);
            typeWriter('source2', 'type2', checkDone);
        }, 800);
    }

    if (stepNumber === 4) {
        setTimeout(launchConfetti, 300);
        startPhotoShuffle();
    } else {
        if(shuffleInterval) clearInterval(shuffleInterval);
    }

    setTimeout(() => {
        const nextStep = document.getElementById('step' + stepNumber);
        nextStep.classList.remove('hidden');
        setTimeout(() => nextStep.classList.add('active'), 50);
    }, 600);
}

// Bulletproof Live Typing
function typeWriter(sourceId, targetId, callback) {
    const text = document.getElementById(sourceId).innerHTML;
    const target = document.getElementById(targetId);

    if (target.typingTimer) {
        clearTimeout(target.typingTimer);
    }

    target.innerHTML = ''; 
    target.classList.add('typing-target'); 
    let i = 0;

    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            target.typingTimer = setTimeout(type, 35);
        } else {
            target.classList.remove('typing-target'); 
            if (callback) callback();
        }
    }
    type();
}

// Photo Shuffle
function startPhotoShuffle() {
    const photos = document.querySelectorAll('.polaroid');
    if (shuffleInterval) clearInterval(shuffleInterval);

    shuffleInterval = setInterval(() => {
        positions.unshift(positions.pop()); 
        photos.forEach((photo, index) => {
            photo.className = 'polaroid ' + positions[index];
        });
    }, 4000); 
}

// Upgraded Multi-Colored Tulip Engine
function launchConfetti() {
    const container = document.getElementById('confetti-canvas');
    
    // 50 tulips is the sweet spot so it doesn't crowd the screen
    for (let i = 0; i < 50; i++) {
        let conf = document.createElement('div');
        conf.classList.add('confetti-piece');
        conf.innerText = '🌷'; 
        
        // Random horizontal start
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-40px'; 

        // CSS Magic: Shifts the color of the emoji to create yellow, blue, purple, etc.
        let hueShift = Math.floor(Math.random() * 360);
        conf.style.filter = `hue-rotate(${hueShift}deg)`;

        // Randomize the spin direction (clockwise or counter-clockwise)
        let spinDirection = Math.random() > 0.5 ? 1 : -1;
        conf.style.setProperty('--spin', spinDirection);

        let duration = Math.random() * 4 + 4; // Slightly slower, floatier fall for flowers
        let delay = Math.random() * 2;
        
        conf.style.animation = `flowerFall ${duration}s linear ${delay}s forwards`;

        conf.addEventListener('animationend', () => conf.remove());
        container.appendChild(conf);
    }
}

// Inject the custom tumbling keyframes
if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.innerHTML = `
    @keyframes flowerFall { 
        0% { transform: translateY(0) rotate(0deg); opacity: 1; } 
        /* Uses the --spin variable to tumble left or right */
        100% { transform: translateY(110vh) rotate(calc(720deg * var(--spin))); opacity: 0; } 
    }`;
    document.head.appendChild(style);
}

// ==========================================
// THE NEW JAVASCRIPT LIVE PLEXUS BACKGROUND
// ==========================================
const canvas = document.getElementById('plexus-network');
const ctx = canvas.getContext('2d');

let width, height;
function setSize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
setSize();
window.addEventListener('resize', setSize);

const particles = [];
const particleCount = window.innerWidth < 600 ? 40 : 80; 
const maxLineDist = 120;

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)'; 
        ctx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxLineDist) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                const opacity = 1 - (dist / maxLineDist);
                ctx.strokeStyle = `rgba(255, 0, 255, ${opacity * 0.5})`; 
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
}

animate();

// ==========================================
// FULLSCREEN IMAGE POPUP LOGIC
// ==========================================
function openModal(imgSrc) {
    const modal = document.getElementById('image-modal');
    const expandedImg = document.getElementById('expanded-img');

    expandedImg.src = imgSrc; 
    modal.classList.add('active'); 
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active'); 
}
