function showContent() {
    // 1. Play Music
    const audio = document.getElementById('bg-music');
    audio.play();

    // 2. Hide Intro, Show Content
    document.getElementById('intro-view').classList.add('hidden');
    document.getElementById('content-view').classList.remove('hidden');

    // 3. Trigger Confetti
    triggerConfetti();
}

function triggerConfetti() {
    // Basic logic to inject confetti elements into the DOM
    console.log("Confetti launched! 🎉");
}

// Keep your existing App logic here to inject the messages into #app
