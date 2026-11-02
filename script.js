// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.innerHTML = navLinks.classList.contains("open")
    ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
}));

// Light / dark theme (saved in browser)
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light");
function updateThemeIcon() {
  themeToggle.innerHTML = document.body.classList.contains("light")
    ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
  if (window.lucide) lucide.createIcons();
}
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

// Typing effect
const phrases = ["AI & technology", "machine learning", "full-stack development", "real-world solutions"];
const typingText = document.getElementById("typingText");
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeEffect() {
  const phrase = phrases[phraseIndex];
  typingText.textContent = phrase.substring(0, charIndex);
  if (!deleting && charIndex < phrase.length) { charIndex++; setTimeout(typeEffect, 85); }
  else if (deleting && charIndex > 0) { charIndex--; setTimeout(typeEffect, 42); }
  else { deleting = !deleting; if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeEffect, 750); }
}
typeEffect();

// Reveal sections as they enter the viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Active navigation link
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// Scroll progress and footer year
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("scrollProgress").style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
});
document.getElementById("year").textContent = new Date().getFullYear();
if (window.lucide) lucide.createIcons();
