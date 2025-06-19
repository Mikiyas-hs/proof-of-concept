
document.querySelectorAll('.aantekening-toggle').forEach(toggle => {

    toggle.addEventListener('click', () => {

        const dropdown = toggle.nextElementSibling;
        const chevron = toggle.querySelector('.chevron');

    dropdown.classList.toggle('show');
    chevron.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});

// progressie indicator
const voortgangsregels = document.querySelectorAll('.klas-blok p:last-of-type');

voortgangsregels.forEach(p => {
    // hier word het percentage gehaald bijv. voortgang is 92%
  const match = p.textContent.match(/(\d+)%/);
  if (!match) return;

  const percentage = Number(match[1]);
  let kleur = '';
// bepaalt kleur op basis van percentage
  if (percentage < 50) {
    kleur = 'var(--color-danger)';
  } else if (percentage < 75) {
    kleur = '#FACC15';
  } else {
    kleur = 'var(--color-success)';
  }

// vervangt de orginele teks met een voortgangsbalk 
  p.innerHTML = `
    <div class="progress-container">
      <div class="progress-bar" style="width:${percentage}%; background-color:${kleur}">
        ${percentage}%
      </div>
    </div>
  `;
});

  