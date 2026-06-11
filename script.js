let shuffleInterval;
let positions = ['pos-1', 'pos-2', 'pos-3'];
const audio = document.getElementById('bg-music');

// Attempt to play audio as soon as page loads (Browsers might block this until click)
window.onload = function() {
    audio.play().catch(e => console.log("Browser blocked autoplay. Will play on first click."));
};

// Audio Control Button
function toggleAudio() {
    const btn = document.getElementById('audio-control');
    if (audio.paused) {
        audio.play();
        btn.innerText = '🔊';
    } else {
        audio.pause();
        btn.innerText = '🔇';
    }
}

function goToStep(stepNumber) {
    // Make sure audio is playing once user interacts
    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed"));
        document.getElementById('audio-control').innerText = '🔊';
    }

    document.querySelectorAll('.step-container').forEach(step => {
        step.classList.remove('active');
        setTimeout(() => step.classList.add('hidden'), 600);
    });

    if (stepNumber === 2) {
        setTimeout(() => {
            // Start typing effect for the first message
            typeWriter('source1', 'type1', () => {
                // When finished, show the second title and start typing the second message
                document.getElementById('title2').classList.remove('hidden');
                setTimeout(() => {
                    typeWriter('source2', 'type2', () => {
                        // Show the final button when all typing is done
                        document.getElementById('btn2').classList.remove('hidden');
                    });
                }, 500);
            });
        }, 1000); // Start typing 1 second after entering step 2
    }
    
    if (stepNumber === 3) {
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

// Live Typing Effect
function typeWriter(sourceId, targetId, callback) {
    const text = document.getElementById(sourceId).innerHTML;
    const target = document.getElementById(targetId);
    target.innerHTML = ''; // Clear target
    let i = 0;
    
    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40); // Typing speed
        } else {
            target.classList.remove('typing-target'); // Remove blinking cursor
            if (callback) callback();
        }
    }
    type();
}

// Ultra Smooth Shuffle Logic
function startPhotoShuffle() {
    const photos = document.querySelectorAll('.polaroid');
    if (shuffleInterval) clearInterval(shuffleInterval);
    
    shuffleInterval = setInterval(() => {
        positions.unshift(positions.pop()); 
        photos.forEach((photo, index) => {
            photo.className = 'polaroid ' + positions[index];
        });
    }, 4000); // Fires every 4 seconds, matching the 2.5s transition beautifully
}

// Confetti Engine
function launchConfetti() {
    const container = document.getElementById('confetti-canvas');
    const colors = ['#ff007f', '#ffbf00', '#00f0ff', '#ffffff'];
    
    for (let i = 0; i < 75; i++) {
        let conf = document.createElement('div');
        conf.classList.add('confetti-piece');
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.top = '-10px';
        let duration = Math.random() * 3 + 2;
        let delay = Math.random() * 2;
        conf.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        container.appendChild(conf);
    }
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
`;
document.head.appendChild(style);
