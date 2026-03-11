/* =========================
PORTFOLIO SCRIPT
========================= */

document.addEventListener("DOMContentLoaded", function(){

/* =========================
TYPING ANIMATION
========================= */

const typingText = document.getElementById("typing-text")

const words = [
"Frontend Developer",
"BCA Student",
"JavaScript Developer",
"Future Software Engineer"
]

let wordIndex = 0
let charIndex = 0
let deleting = false

function type(){

let currentWord = words[wordIndex]

if(!deleting){

typingText.textContent = currentWord.substring(0,charIndex+1)

charIndex++

if(charIndex === currentWord.length){

deleting = true
setTimeout(type,1500)
return

}

}else{

typingText.textContent = currentWord.substring(0,charIndex-1)

charIndex--

if(charIndex === 0){

deleting = false
wordIndex++

if(wordIndex === words.length){

wordIndex = 0

}

}

}

setTimeout(type,100)

}

if(typingText){
type()
}


/* =========================
THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle")

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("light-mode")

const icon = themeToggle.querySelector("i")

if(document.body.classList.contains("light-mode")){

icon.classList.remove("fa-moon")
icon.classList.add("fa-sun")

}else{

icon.classList.remove("fa-sun")
icon.classList.add("fa-moon")

}

})



/* =========================
SMOOTH SCROLL NAVIGATION
========================= */

const navLinks = document.querySelectorAll(".nav-links a")

navLinks.forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault()

const target = document.querySelector(this.getAttribute("href"))

target.scrollIntoView({
behavior:"smooth"
})

})

})



/* =========================
ACTIVE NAVBAR SECTION
========================= */

const sections = document.querySelectorAll("section")

window.addEventListener("scroll", () => {

let current = ""

sections.forEach(section => {

const sectionTop = section.offsetTop - 120
const sectionHeight = section.clientHeight

if(scrollY >= sectionTop){

current = section.getAttribute("id")

}

})

navLinks.forEach(link => {

link.classList.remove("active")

if(link.getAttribute("href") === "#" + current){

link.classList.add("active")

}

})

})



/* =========================
SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
".tech-card, .project-card, .certificate-card, .timeline-item, .stat-card"
)

function reveal(){

revealElements.forEach(element => {

const windowHeight = window.innerHeight
const elementTop = element.getBoundingClientRect().top
const revealPoint = 120

if(elementTop < windowHeight - revealPoint){

element.classList.add("reveal-active")

}

})

}

window.addEventListener("scroll", reveal)



/* =========================
SKILL BAR ANIMATION
========================= */

const skillBars = document.querySelectorAll(".progress-bar")

function animateSkills(){

skillBars.forEach(bar => {

const position = bar.getBoundingClientRect().top
const screenHeight = window.innerHeight

if(position < screenHeight - 100){

bar.style.width = bar.classList.contains("html") ? "95%" :
bar.classList.contains("css") ? "90%" :
bar.classList.contains("js") ? "80%" :
bar.classList.contains("react") ? "70%" :
"60%"

}

})

}

window.addEventListener("scroll", animateSkills)



/* =========================
PROJECT FILTER
========================= */

const filterButtons = document.querySelectorAll(".project-filters button")

const projects = document.querySelectorAll(".project-card")

filterButtons.forEach(button => {

button.addEventListener("click", () => {

let category = button.textContent.toLowerCase()

projects.forEach(project => {

if(category === "all"){

project.style.display = "block"

}else{

if(project.textContent.toLowerCase().includes(category)){

project.style.display = "block"

}else{

project.style.display = "none"

}

}

})

})

})



/* =========================
STATS COUNTER
========================= */

const counters = document.querySelectorAll(".stat-card h3")

let counterStarted = false

function startCounters(){

if(counterStarted) return

const trigger = document.querySelector("#about")

const position = trigger.getBoundingClientRect().top

if(position < window.innerHeight){

counterStarted = true

counters.forEach(counter => {

let target = parseInt(counter.textContent)
let count = 0
let speed = target / 50

function update(){

count += speed

if(count < target){

counter.textContent = Math.floor(count) + "+"
requestAnimationFrame(update)

}else{

counter.textContent = target + "+"

}

}

update()

})

}

}

window.addEventListener("scroll", startCounters)



/* =========================
BUTTON HOVER EFFECT
========================= */

const buttons = document.querySelectorAll("button, .btn-primary, .btn-secondary")

buttons.forEach(btn => {

btn.addEventListener("mouseenter", () => {

btn.style.transform = "scale(1.05)"

})

btn.addEventListener("mouseleave", () => {

btn.style.transform = "scale(1)"

})

})



/* =========================
NAVBAR BACKGROUND ON SCROLL
========================= */

const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {

if(window.scrollY > 50){

navbar.style.background = "rgba(15,23,42,0.9)"

}else{

navbar.style.background = "rgba(15,23,42,0.7)"

}

})



/* =========================
SCROLL TO TOP BUTTON
========================= */

const scrollBtn = document.createElement("button")

scrollBtn.innerHTML = "↑"

scrollBtn.style.position = "fixed"
scrollBtn.style.bottom = "40px"
scrollBtn.style.right = "40px"
scrollBtn.style.padding = "12px"
scrollBtn.style.borderRadius = "50%"
scrollBtn.style.border = "none"
scrollBtn.style.background = "#38bdf8"
scrollBtn.style.color = "black"
scrollBtn.style.cursor = "pointer"
scrollBtn.style.display = "none"

document.body.appendChild(scrollBtn)

window.addEventListener("scroll", () => {

if(window.scrollY > 500){

scrollBtn.style.display = "block"

}else{

scrollBtn.style.display = "none"

}

})

scrollBtn.addEventListener("click", () => {

window.scrollTo({
top:0,
behavior:"smooth"
})

})



})