// Po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  // Tworzymy przycisk
  const btn = document.createElement('button');
  btn.className = 'md-toggle secondary md-icon';
  btn.title = 'Toggle custom theme';

  // Ikona (Material Design)
  // btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12,3A9,9 0 0,1 21,12H23A11,11 0 0,0 12,1V3Z"></path></svg>';
  // btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12,2C7.58,2 4,5.58 4,10c0,1.97 1.18,3.68 2.91,4.53L8,19l-3.09,1.47c-.13,.06-.22,.17-.27,.31a1,1 0 0 0 .41,1.14C6.11,21.9 7.43,22 8.5,22h7c1.07,0 2.39,-.1 3.67,-.29a1,1 0 0 0 .41,-1.14c-.05,-.13 -.15,-.25 -.27,-.31L16,19l-4,3-1.09,-5.47C12.82,13.68 14,11.97 14,10c0,-4.42 -3.58,-8 -8,-8zM12,6c1.1,0 2,.9 2,2s-.9,2-2,2-2,-.9-2,-2 .9,-2 2,-2z"/></svg>';

btn.innerHTML = '💥';
  btn.style.fontSize   = '24px';      // adjust pixels as needed
  btn.style.lineHeight = '2';         // keep them tight
  // btn.innerHTML = '<i class="fa-solid fa-fireworks"></i>';




  // Dodaj przycisk do nagłówka
  const header = document.querySelector('.md-header__inner');
  header.appendChild(btn);

  // Czytamy stan z localStorage (domyślnie false)
  let on = JSON.parse(localStorage.getItem('customTheme')) || false;
  setState(on);

  btn.addEventListener('click', () => {
    on = !on;
    localStorage.setItem('customTheme', JSON.stringify(on));
    setState(on);
  });

  function setState(active) {
    if (active) {
      document.body.classList.add('custom-theme');
    } else {
      document.body.classList.remove('custom-theme');
    }
  }
});
