const text = "Hello, I'm CyberConductor";

let index = 0;

function typing() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text[index];

        index++;

        setTimeout(typing, 80);
    }
}

typing();


// Current year
document.getElementById("year").textContent =
    new Date().getFullYear();


// Scroll animations
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});


document.querySelectorAll(".hidden")
    .forEach(el => observer.observe(el));


// GitHub repositories
const username = "CyberConductor";

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
.then(response => {
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
})
.then(repos => {
    if (!Array.isArray(repos)) {
        throw new Error("Unexpected GitHub response");
    }

    const container = document.getElementById("repo-container");

    container.innerHTML = "";

    const excludedRepositories = [
        "meetnotify",
        "exp",
        "chessproject1",
        "cyberconductor.github.io"
    ];

    const visibleRepos = repos
        .filter(repo => repo && repo.name)
        .filter(repo => !excludedRepositories.includes(repo.name.toLowerCase()))
        .slice(0, 6);

    if (visibleRepos.length === 0) {
        container.innerHTML = "<p>No public repositories to display.</p>";
        return;
    }

    visibleRepos.forEach(repo => {
        container.innerHTML += `
        <div class="card">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description"}</p>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                View Repository →
            </a>
        </div>
        `;
    });
})
.catch(error => {
    console.error("GitHub API error:", error);
    const container = document.getElementById("repo-container");

    if (container) {
        container.innerHTML = "<p>Unable to load projects right now.</p>";
    }
});


// Mobile menu
const menu = document.getElementById("menu");
const links = document.querySelector(".nav-links");

menu.onclick = () => {

    links.classList.toggle("open");

};


// Theme toggle
const themeToggle =
    document.getElementById("theme-toggle");

const body = document.body;


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
}


themeToggle.onclick = () => {

    const currentTheme =
        body.getAttribute("data-theme");


    const newTheme =
        currentTheme === "dark"
        ? "light"
        : "dark";


    body.setAttribute("data-theme", newTheme);


    localStorage.setItem(
        "theme",
        newTheme
    );

};