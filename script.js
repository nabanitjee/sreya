function showContent() {
    const audio = document.getElementById('bg-music');
    audio.play().catch(e => console.log("Interaction required for audio"));
    document.getElementById('intro-view').classList.add('hidden');
    document.getElementById('content-view').classList.remove('hidden');
}
