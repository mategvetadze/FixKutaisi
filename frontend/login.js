document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#loginPassword');
    const icon = toggle.querySelector('i');
    toggle.addEventListener('click', function () {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".slide-link");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            document.body.classList.add(this.dataset.slide);
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}