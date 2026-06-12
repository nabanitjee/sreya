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
    arrow.classList.add('hidden'); // Hide arrow once interacted with
    if (audio.paused) {
        audio.play();
        btn.innerText = '🔊';
    } else {
        audio.pause();
        btn.innerText = '🔇';
    }
}

// Show popup when music finishes 1 cycle
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

// Live Typing
function typeWriter(sourceId, targetId, callback) {
    const text = document.getElementById(sourceId).innerHTML;
    const target = document.getElementById(targetId);
    target.innerHTML = ''; 
    let i = 0;
    
    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 35);
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

// Fixed Spam-Friendly Confetti Engine
function launchConfetti() {
    const container = document.getElementById('confetti-canvas');
    const colors = ['#ff9eb5', '#d8b4e2', '#fde2bb', '#ffffff'];
    
    for (let i = 0; i < 70; i++) {
        let conf = document.createElement('div');
        conf.classList.add('confetti-piece');
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.top = '-10px';
        
        let duration = Math.random() * 3 + 3; // 3 to 6 seconds fall time
        let delay = Math.random() * 2;
        conf.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        
        // Remove individual piece exactly when it finishes falling (Fixes disappearing bug)
        conf.addEventListener('animationend', () => conf.remove());
        
        container.appendChild(conf);
    }
}

// Inject Keyframes
if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.innerHTML = `@keyframes fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }`;
    document.head.appendChild(style);
}
