const text =
"Hello, I'm CyberConductor";


let index = 0;


function typing(){

if(index < text.length){

document.getElementById("typing").innerHTML += text[index];

index++;

setTimeout(typing,80);

}

}


typing();




document.getElementById("year").textContent =
new Date().getFullYear();




const observer =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");

}


});


});



document.querySelectorAll(".hidden")
.forEach(el=>observer.observe(el));




const username="YOUR_USERNAME";


fetch(`https://api.github.com/users/${username}/repos`)
.then(response=>response.json())
.then(repos=>{


const container =
document.getElementById("repo-container");


container.innerHTML="";


repos.slice(0,6).forEach(repo=>{


container.innerHTML += `

<div class="card">

<h3>${repo.name}</h3>

<p>
${repo.description || "No description"}
</p>

<a href="${repo.html_url}">
View Repository →
</a>

</div>

`;

});


});




const menu =
document.getElementById("menu");


const links =
document.querySelector(".nav-links");


menu.onclick=()=>{

links.classList.toggle("open");

};