function next(step) {
    // Hide all cards
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    // Show the specific card
    const nextCard = document.getElementById('step' + step);
    nextCard.classList.remove('hidden');
}
