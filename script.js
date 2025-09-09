// Navbar mobile toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.style.display = navbar.style.display === "block" ? "none" : "block";
});

// (Opsional) Buka Google Maps dari destinasi
function openMap(url) {
  window.open(url, "_blank");
}

let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector("header");

window.addEventListener("scroll", function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos < currentScrollPos) {
    // Scroll ke bawah -> sembunyikan navbar
    navbar.style.top = "-80px"; 
  } else {
    // Scroll ke atas -> munculkan navbar
    navbar.style.top = "0";
  }

  prevScrollPos = currentScrollPos;
});
