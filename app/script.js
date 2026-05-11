document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('facilityModal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            cards.forEach(card => {
                const title = card.dataset.title.toLowerCase();
                const category = card.dataset.category.toLowerCase();
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.textContent = card.dataset.title;
            modalCategory.textContent = card.dataset.category;
            modalDescription.textContent = card.dataset.desc;
            modal.classList.add('show');
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});