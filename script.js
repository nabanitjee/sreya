function next(id) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById('s' + id).classList.add('active');
}