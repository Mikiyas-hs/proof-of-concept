
document.querySelectorAll('.aantekening-toggle').forEach(toggle => {

    toggle.addEventListener('click', () => {

        const dropdown = toggle.nextElementSibling;
        const chevron = toggle.querySelector('.chevron');

    dropdown.classList.toggle('show');
    chevron.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});
