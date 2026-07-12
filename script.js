const text = "Hello, I'm CyberConductor";
let index = 0;

function typing() {
  if (index < text.length) {
    document.getElementById('typing').textContent += text[index];
    index += 1;
    setTimeout(typing, 66);
  }
}

typing();

const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

document.body.dataset.theme = initialTheme;
updateThemeIcon(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
  updateThemeIcon(nextTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  } else {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
}

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

const username = 'cyberconductor';
fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => response.json())
  .then((repos) => {
    const container = document.getElementById('repo-container');
    container.innerHTML = '';

    repos.slice(0, 6).forEach((repo) => {
      container.innerHTML += `
        <div class="card">
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description'}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener">View Repository →</a>
        </div>
      `;
    });
  })
  .catch(() => {
    document.getElementById('repo-container').textContent = 'Unable to load repositories.';
  });

const menu = document.getElementById('menu');
menu.onclick = () => {
  const isOpen = document.body.classList.toggle('nav-open');
  menu.setAttribute('aria-expanded', String(isOpen));
};