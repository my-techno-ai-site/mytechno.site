document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll
    const links = document.querySelectorAll('.nav-links a, #learnMore');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            let targetId = this.getAttribute('href');
            if (this.id === 'learnMore') targetId = '#services';

            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 85,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Pengiriman Form via AJAX (Real Gmail)
    const contactForm = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const btn = document.getElementById('submitBtn');
            const data = new FormData(contactForm);

            btn.innerText = 'Sedang Mengirim...';
            btn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "<p style='color: #059669; font-weight: bold; margin-top: 20px;'>Terima kasih! Pesan Anda sudah terkirim ke Gmail kami.</p>";
                    contactForm.reset();
                } else {
                    status.innerHTML = "<p style='color: #dc2626; margin-top: 20px;'>Terjadi kesalahan. Pastikan Form ID sudah aktif.</p>";
                }
            }).catch(error => {
                status.innerHTML = "<p style='color: #dc2626; margin-top: 20px;'>Masalah koneksi server.</p>";
            }).finally(() => {
                btn.innerText = 'Kirim Pesan';
                btn.disabled = false;
            });
        });
    }

    // 3. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.padding = '0.9rem 10%';
        } else {
            header.style.background = '#0f172a';
            header.style.padding = '1.2rem 10%';
        }
    });
});