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
