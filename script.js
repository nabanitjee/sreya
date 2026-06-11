let shuffleInterval;
let positions = ['pos-1', 'pos-2', 'pos-3'];
const audio = document.getElementById('bg-music');

window.onload = function() {
    audio.play().catch(e => console.log("Browser blocked autoplay. Will play on first click."));
};

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
    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed"));
        document.getElementById('audio-control').innerText = '🔊';
    }

    document.querySelectorAll('.step-container').forEach(step => {
        step.classList.remove('active');
        setTimeout(() => step.classList.add('hidden'), 600);
    });

    // Modified Logic: Simultaneous Typing
    if (stepNumber === 2) {
        setTimeout(() => {
            let typingCompleted = 0;
            
            // This function checks if both texts are done typing
            const checkDone = () => {
                typingCompleted++;
                if (typingCompleted === 2) {
                    document.getElementById('btn2').classList.remove('hidden');
                }
            };

            // Start both at the exact same time
            typeWriter('source1', 'type1', checkDone);
            typeWriter('source2', 'type2', checkDone);
            
        }, 1000);
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

function typeWriter(sourceId, targetId, callback) {
    const text = document.getElementById(sourceId).innerHTML;
    const target = document.getElementById(targetId);
    target.innerHTML = ''; 
    let i = 0;
    
    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        } else {
            target.classList.remove('typing-target'); 
            if (callback) callback();
        }
    }
    type();
}

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

function launchConfetti() {
    const container = document.getElementById('confetti-canvas');
    const colors = ['#ff9eb5', '#d8b4e2', '#fde2bb', '#ffffff'];
    
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
    
    // Automatically clean up old confetti pieces so the browser doesn't lag if they spam the button
    setTimeout(() => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }, 6000);
}

// Ensure keyframes are injected
if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.innerHTML = `@keyframes fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }`;
    document.head.appendChild(style);
}
