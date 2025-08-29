// === Navbar Mobile Toggle ===
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  // Jika menu terlihat → sembunyikan, kalau tersembunyi → tampilkan
  if (navbar.style.display === "block") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
});

// === Buka Google Maps dari Destinasi ===
function openMap(url) {
  window.open(url, "_blank"); // buka link di tab baru
}
