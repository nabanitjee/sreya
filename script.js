function next(step) {
    // Select all cards
    const cards = document.querySelectorAll('.card');
    
    // Hide all
    cards.forEach(card => card.classList.add('hidden'));
    
    // Show target
    const target = document.getElementById('step' + step);
    target.classList.remove('hidden');
}
