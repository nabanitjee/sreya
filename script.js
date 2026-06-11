let shuffleInterval; // Store the timer so we can start/stop it
let positions = ['pos-1', 'pos-2', 'pos-3'];

function goToStep(stepNumber) {
    // Hide all steps smoothly
    document.querySelectorAll('.step-container').forEach(step => {
        step.classList.remove('active');
        setTimeout(() => step.classList.add('hidden'), 600); // Wait for fade out
    });

    // Handle music play on first interaction
    if (stepNumber === 2) {
        const audio = document.getElementById('bg-music');
        audio.play().catch(e => console.log("Audio play failed/blocked"));
    }
    
    // Handle Step 3 Specifics
    if (stepNumber === 3) {
        setTimeout(launchConfetti, 300); // Fire confetti on entry
        
        // Start Idea 3: The Passive Shuffle (Every 3.5 seconds)
        startPhotoShuffle();
    } else {
        // Stop shuffle if we leave step 3 (paranoia check)
        if(shuffleInterval) clearInterval(shuffleInterval);
    }

    // Show the targeted step smoothly
    setTimeout(() => {
        const nextStep = document.getElementById('step' + stepNumber);
        nextStep.classList.remove('hidden');
        setTimeout(() => nextStep.classList.add('active'), 50);
    }, 600);
}

// Logic for Idea 3: Drifting & Shuffling
function startPhotoShuffle() {
    const photos = document.querySelectorAll('.polaroid');
    if (shuffleInterval) clearInterval(shuffleInterval); // Clear old timer if any
    
    // Shuffle logic (Passive loop)
    shuffleInterval = setInterval(() => {
        // Move the last element of the positions array to the start
        positions.unshift(positions.pop()); 
        
        // Reassign the updated positions classes to the photos
        photos.forEach((photo, index) => {
            photo.className = 'polaroid ' + positions[index];
        });
    }, 3500); 
}

// Custom Confetti Generator for Step 3
function launchConfetti() {
    const container = document.getElementById('confetti-canvas');
    const colors = ['#ff007f', '#ffbf00', '#00f0ff', '#ffffff'];
    
    for (let i = 0; i < 75; i++) {
        let conf = document.createElement('div');
        conf.classList.add('confetti-piece');
        
        // Randomize properties
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.top = '-10px';
        
        // Randomize animation
        let duration = Math.random() * 3 + 2;
        let delay = Math.random() * 2;
        
        conf.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        container.appendChild(conf);
    }
}

// Inject keyframes for confetti dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
`;
document.head.appendChild(style);
