// Navbar mobile toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  if (navbar.style.display === "block") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
});

// Auto-close navbar after click (mobile)
const navLinks = navbar.querySelectorAll("a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navbar.style.display = "none";
    }
  });
});
