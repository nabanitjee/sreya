function next(step) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    document.getElementById('step' + step).classList.remove('hidden');
}