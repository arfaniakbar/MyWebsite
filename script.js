// === Navbar Mobile Toggle ===
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  if (navbar.style.display === "flex") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "flex";
  }
});

// === Example Function for Destinasi ===
function openMap(url) {
  window.open(url, "_blank");
}
