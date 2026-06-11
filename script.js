function nextCard(step) {
    // 1. Select all the cards on the page
    const cards = document.querySelectorAll('.card');
    
    // 2. Hide every single card by removing 'active' and adding 'hidden'
    cards.forEach(card => {
        card.classList.remove('active');
        card.classList.add('hidden');
    });
    
    // 3. Find the specific card for the next step and show it
    const targetCard = document.getElementById('card' + step);
    targetCard.classList.remove('hidden');
    targetCard.classList.add('active');
}
