
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


// loading state
document.querySelectorAll('.aantekening-form').forEach(form => {
    form.addEventListener('submit', e => {
      const btn = form.querySelector('button');
      btn.classList.add('loading');
    });
  });

// succes state
document.querySelectorAll('.aantekening-form').forEach(form => {

    form.addEventListener('submit', e => {
      const button = form.querySelector('button');
      button.disabled = true;
      button.textContent = 'Opslaan...';
  
      const popup = document.querySelector('.popup');
      popup.classList.add('show');
  
      setTimeout(() => {
        popup.classList.remove('show');
        button.disabled = false;
        button.textContent = 'Opslaan';
      }, 2000);
    });
  });
  
  
// user data button
const tabButtons = document.querySelectorAll('.section-one button');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});



// klassen button
document.querySelectorAll('.tab-buttons button').forEach(btn => {
    
    btn.addEventListener('click', () => {
      
      document.querySelectorAll('.tab-buttons button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  