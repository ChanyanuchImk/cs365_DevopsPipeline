document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addMemberForm');
    const nameInput = document.getElementById('nameInput');
    const roleInput = document.getElementById('roleInput');
    const memberGrid = document.getElementById('memberGrid');

    // Array of gradient classes we created in CSS
    const gradients = ['bg-gradient-1', 'bg-gradient-2', 'bg-gradient-3'];

    // Helper to get initials from name (e.g., "John Doe" -> "JD")
    function getInitials(name) {
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        } else if (words.length === 1 && words[0] !== '') {
            return words[0].substring(0, 2).toUpperCase();
        }
        return '?';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh

        const name = nameInput.value.trim();
        const role = roleInput.value.trim();

        if (name === '' || role === '') return;

        const initials = getInitials(name);
        
        // Pick a random gradient class for the background
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

        // Create the new card element
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image ${randomGradient}">
                <span class="initials">${initials}</span>
            </div>
            <div class="card-content">
                <h2>${name}</h2>
                <p class="role">${role}</p>
            </div>
        `;

        // Add the new card to the grid
        memberGrid.appendChild(card);

        // Clear input fields
        nameInput.value = '';
        roleInput.value = '';
        nameInput.focus();
    });
});
