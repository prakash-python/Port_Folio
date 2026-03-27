// WhatsAppIntegration
function openWhatsApp() {
    const phoneNumber = "916302581405";
    const defaultMessage = "Hello Prakash, I came across your portfolio and wanted to connect with you about an engineering role.";
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Add scrolled class to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(9, 9, 11, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(9, 9, 11, 0.8)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    }
});

// Smooth scroll function and prevent hash appending in URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar-custom').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20; // 20px padding offset
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Dynamic Documentation Async Loading
// ==========================================
function loadDocumentation(modalId, bodyId, docPath) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.addEventListener('show.bs.modal', function () {
        const body = document.getElementById(bodyId);
        // Only load if the modal body is empty
        if (body.innerHTML.trim() === '') {
            if (docPath.endsWith('.pdf')) {
                // Browsers handle local file:/// PDFs much better in <embed> or <object> tags than <iframe>
                body.innerHTML = `
                    <embed src="${docPath}" type="application/pdf" width="100%" height="100%" style="min-height: 80vh;" />
                    <div class="text-center p-3 text-secondary d-none d-md-block" style="position:absolute; bottom:0; width:100%; pointer-events:none;">
                        <small>If the PDF does not load automatically, please use the download button above.</small>
                    </div>
                `;
            } else {
                body.innerHTML = `
                    <div id="loader-${bodyId}" class="d-flex flex-column justify-content-center align-items-center h-100" style="min-height: 400px; position:absolute; width:100%; z-index:0;">
                        <div class="spinner-border text-primary shadow-sm" role="status" style="width: 3rem; height: 3rem; border-width: 0.25rem;"></div>
                        <p class="mt-4 text-secondary fw-bold" style="letter-spacing: 1px;">Loading Documentation...</p>
                    </div>
                    <!-- Iframe bypasses local file:// CORS fetching restrictions -->
                    <iframe src="${docPath}" style="width: 100%; min-height: 70vh; border: none; position:relative; z-index:1; background:#ffffff;" onload="let l=document.getElementById('loader-${bodyId}'); if(l) l.style.display='none';"></iframe>
                `;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el, { trigger: 'hover' });
    });
    loadDocumentation('modalAutoDoc', 'bodyAutoDoc', 'docs/autodoc_docs.html');
    loadDocumentation('modalInstaBackend', 'bodyInstaBackend', 'docs/instabackend_docs.html');
});
