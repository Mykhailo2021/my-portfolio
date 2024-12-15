document.getElementById('contactButton').addEventListener('click', function() {
    const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
    contactModal.show(); // Show the modal
});

// Optional: Remove backdrop manually if it doesn't disappear
document.getElementById('contactModal').addEventListener('hidden.bs.modal', function () {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove(); // Remove the backdrop
    }
});