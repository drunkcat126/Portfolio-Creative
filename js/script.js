const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Save user preference on load
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
    }
}

// Adding date
let myDate = document.querySelector("#datee");
if (myDate) {
    const yes = new Date().getFullYear();
    myDate.innerHTML = yes;
}

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('see-more-btn');
    if (!seeMoreBtn) {
        console.log('Tombol Show More tidak ditemukan!');
        return;
    }
    
    const projectCards = document.querySelectorAll('.project .card');
    console.log('Jumlah project cards:', projectCards.length);
    
    // Sembunyikan card setelah ke-6
    for (let i = 9; i < projectCards.length; i++) {
        projectCards[i].style.display = 'none';
    }
    
    seeMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const hiddenCards = document.querySelectorAll('.project .card[style="display: none;"]');
        const visibleCards = document.querySelectorAll('.project .card[style=""]');
        
        if (hiddenCards.length > 0) {
            // Tampilkan semua card yang tersembunyi
            hiddenCards.forEach(card => {
                card.style.display = '';
            });
            seeMoreBtn.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
        } else {
            // Sembunyikan card setelah ke-6
            for (let i = 9; i < projectCards.length; i++) {
                projectCards[i].style.display = 'none';
            }
            seeMoreBtn.innerHTML = 'Show More <i class="fas fa-arrow-down"></i>';
        }
    });
});