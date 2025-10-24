// --- ORIGINAL SCRIPT (Hamburger, Theme, Scroll) ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

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

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
    }
}

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

// --- REVISED SCRIPT (Profile Zoom + Filter + Show More/Less) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Profile Image Click Zoom ---
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    }

    // --- Variabel Proyek dan Filter ---
    const seeMoreBtn = document.getElementById('see-more-btn');
    const projectCards = document.querySelectorAll('.project .card-link-wrapper');
    const projectsContainer = document.getElementById('projects');
    const projectsToShowDefault = 9;

    // --- LOGIKA DROPDOWN KUSTOM BARU ---
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    
    if (customSelectWrapper) {
        const trigger = customSelectWrapper.querySelector('.custom-select-trigger');
        const triggerText = trigger.querySelector('.trigger-text');
        const optionsList = customSelectWrapper.querySelector('.custom-options');
        const options = customSelectWrapper.querySelectorAll('.custom-option');

        // 1. Buka/Tutup dropdown saat trigger di-klik
        trigger.addEventListener('click', () => {
            optionsList.classList.toggle('open');
        });

        // 2. Pilih opsi
        options.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.getAttribute('data-value');
                const selectedText = option.textContent;

                // Update teks di trigger
                triggerText.textContent = selectedText;
                
                // Tutup dropdown
                optionsList.classList.remove('open');

                // Terapkan filter!
                applyFilter(selectedValue);
            });
        });

        // 3. Tutup dropdown saat klik di luar
        window.addEventListener('click', (e) => {
            if (!customSelectWrapper.contains(e.target)) {
                optionsList.classList.remove('open');
            }
        });
    }
    // --- AKHIR LOGIKA DROPDOWN KUSTOM ---


    // --- Helper Function untuk Menerapkan Filter ---
    // (Fungsi ini tidak perlu diubah, sudah benar)
    function applyFilter(filterValue) {
        let visibleCardCount = 0;
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const matchesFilter = (filterValue === 'all' || (category && category.includes(filterValue)));
            
            if (matchesFilter) {
                // Jika cocok, cek batas "Show More"
                if (visibleCardCount < projectsToShowDefault) {
                    card.style.display = 'block';
                    card.classList.add('show');
                    visibleCardCount++;
                } else {
                    card.style.display = 'none'; // Sembunyikan jika melebihi batas
                    card.classList.remove('show');
                }
            } else {
                card.style.display = 'none'; // Sembunyikan jika tidak cocok filter
                card.classList.remove('show');
            }
        });

        // --- Update Tombol "Show More" ---
        if (seeMoreBtn) {
            // Hitung total kartu yang cocok (termasuk yang tersembunyi)
            const totalMatchingCards = Array.from(projectCards).filter(card => {
                const category = card.getAttribute('data-category');
                return (filterValue === 'all' || (category && category.includes(filterValue)));
            }).length;

            if (totalMatchingCards > projectsToShowDefault) {
                seeMoreBtn.style.display = 'block'; // Tampilkan tombol
                seeMoreBtn.innerHTML = 'Show More <i class="fas fa-arrow-down"></i>';
                seeMoreBtn.classList.remove('expanded');
            } else {
                seeMoreBtn.style.display = 'none'; // Sembunyikan tombol
            }
        }
    } // --- Akhir dari fungsi applyFilter ---

    // --- Event Listener untuk Tombol "Show More" ---
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Dapatkan filter yang sedang aktif dari TEKS trigger
            const triggerText = customSelectWrapper ? customSelectWrapper.querySelector('.trigger-text').textContent : 'All Projects';
            // Cari data-value yang sesuai dengan teks
            const selectedOption = Array.from(customSelectWrapper.querySelectorAll('.custom-option')).find(opt => opt.textContent === triggerText);
            const activeFilter = selectedOption ? selectedOption.getAttribute('data-value') : 'all';
            
            const allMatchingCards = Array.from(projectCards).filter(card => {
                const category = card.getAttribute('data-category');
                return (activeFilter === 'all' || (category && category.includes(activeFilter)));
            });

            // Temukan kartu yang tersembunyi HANYA karena batas 'show more'
            const hiddenByLimitCards = allMatchingCards.filter(card => card.style.display === 'none');

            if (hiddenByLimitCards.length > 0) {
                // Tampilkan semua kartu
                hiddenByLimitCards.forEach(card => {
                    card.style.display = 'block';
                });
                seeMoreBtn.innerHTML = 'Show Less <i class="fas fa-arrow-down"></i>';
                seeMoreBtn.classList.add('expanded');
            } else {
                // Sembunyikan kartu setelah batas default
                for (let i = projectsToShowDefault; i < allMatchingCards.length; i++) {
                    allMatchingCards[i].style.display = 'none';
                }
                seeMoreBtn.innerHTML = 'Show More <i class="fas fa-arrow-down"></i>';
                seeMoreBtn.classList.remove('expanded');
                
                if (projectsContainer) {
                    projectsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // (Listener untuk projectFilterSelect yang lama sudah dihapus)
    
    // --- Inisialisasi: Terapkan filter 'all' saat halaman dimuat ---
    applyFilter('all');

});