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

// === Auto hide navbar saat scroll ===
let prevScrollPos = window.pageYOffset;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos < currentScrollPos) {
    // scroll ke bawah -> sembunyikan navbar
    header.style.top = "-80px"; 
  } else {
    // scroll ke atas -> munculkan navbar
    header.style.top = "0";
  }

  prevScrollPos = currentScrollPos;
});
