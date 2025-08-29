// Navbar mobile toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Tutup navbar otomatis setelah klik link (mobile)
const navLinks = document.querySelectorAll("#navbar a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navbar.classList.remove("active");
    }
  });
});

// Buka Google Maps dari destinasi
function openMap(url) {
  if (url && url.startsWith("http")) {
    window.open(url, "_blank");
  } else {
    console.error("URL Google Maps tidak valid:", url);
  }
}
