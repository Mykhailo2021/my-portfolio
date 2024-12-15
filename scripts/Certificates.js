document.addEventListener('DOMContentLoaded', function() {
    const certificatesModal = document.getElementById('certificatesModal');
    const originalModalBody = certificatesModal.querySelector('.modal-body').innerHTML;
    
    function setupCertificateImageListeners() {
        const certificateImages = document.querySelectorAll('.certificate-image');
        
        certificateImages.forEach(img => {
            img.addEventListener('click', function() {
                const certName = this.getAttribute('data-cert-name');
                const certOrg = this.getAttribute('data-cert-org');
                const certDate = this.getAttribute('data-cert-date');
                const certPdf = this.getAttribute('data-cert-pdf');
                const certImage = this.src;

                const modalBody = certificatesModal.querySelector('.modal-body');
                
                modalBody.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${certImage}" alt="${certName}" class="img-fluid mb-3 certificate-detail-image">
                        </div>
                        <div class="col-md-6">
                            <div class="certificate-details">
                                <h4>${certName}</h4>
                                <p><strong>Issuing Organization:</strong> ${certOrg}</p>
                                <p><strong>Date Issued:</strong> ${certDate}</p>
                                <a href="${certPdf}" class="btn btn-download mt-2" download="${certName.replace(/\s+/g, '_')}.pdf">
                                    Download Certificate
                                </a>
                                <button class="btn btn-secondary mt-2 ms-2" id="backToCertificatesBtn">
                                    Back to Certificates
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('backToCertificatesBtn').addEventListener('click', function() {
                    // Reset to original modal body
                    modalBody.innerHTML = originalModalBody;
                    
                    // Re-setup listeners for certificate images
                    setupCertificateImageListeners();
                });
            });
        });
    }

    // Initial setup of certificate image listeners
    setupCertificateImageListeners();

    // Reset modal body when modal is opened
    certificatesModal.addEventListener('show.bs.modal', function() {
        const modalBody = certificatesModal.querySelector('.modal-body');
        modalBody.innerHTML = originalModalBody;
        setupCertificateImageListeners();
    });
});