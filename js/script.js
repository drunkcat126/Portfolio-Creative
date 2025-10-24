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

document.addEventListener('DOMContentLoaded', function() {

    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    }

    const seeMoreBtn = document.getElementById('see-more-btn');
    const projectCards = document.querySelectorAll('.project .card-link-wrapper');
    const projectsContainer = document.getElementById('projects');
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    const projectsToShowDefault = 9;

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const activeFilterBtn = document.querySelector('.btn-filter.active');
            if (!activeFilterBtn) return;
            
            const activeFilter = activeFilterBtn.getAttribute('data-filter');

            const allMatchingCards = Array.from(projectCards).filter(card => {
                const category = card.getAttribute('data-category');
                return (activeFilter === 'all' || (category && category.includes(activeFilter)));
            });

            const hiddenByLimitCards = allMatchingCards.filter(card => card.style.display === 'none');

            if (hiddenByLimitCards.length > 0) {
                hiddenByLimitCards.forEach(card => {
                    card.style.display = 'block';
                });
                seeMoreBtn.innerHTML = 'Show Less <i class="fas fa-arrow-down"></i>';
                seeMoreBtn.classList.add('expanded');
            } else {
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

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                let visibleCardCount = 0;

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const matchesFilter = (filterValue === 'all' || (category && category.includes(filterValue)));
                    
                    if (matchesFilter) {
                        if (visibleCardCount < projectsToShowDefault) {
                            card.style.display = 'block';
                            card.classList.add('show');
                            visibleCardCount++;
                        } else {
                            card.style.display = 'none'; 
                            card.classList.remove('show');
                        }
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('show');
                    }
                });

                if (seeMoreBtn) {
                    const totalMatchingCards = Array.from(projectCards).filter(card => {
                        const category = card.getAttribute('data-category');
                        return (filterValue === 'all' || (category && category.includes(filterValue)));
                    }).length;

                    if (totalMatchingCards > projectsToShowDefault) {
                        seeMoreBtn.style.display = 'block';
                        seeMoreBtn.innerHTML = 'Show More <i class="fas fa-arrow-down"></i>';
                        seeMoreBtn.classList.remove('expanded');
                    } else {
                        seeMoreBtn.style.display = 'none';
                    }
                }
            });
        });
    }

    const allButton = document.querySelector('.btn-filter[data-filter="all"]');
    if (allButton) {
        allButton.click(); 
    } else {
        if (projectCards.length > projectsToShowDefault) {
            for (let i = projectsToShowDefault; i < projectCards.length; i++) {
                projectCards[i].style.display = 'none';
            }
        } else if (seeMoreBtn) {
            seeMoreBtn.style.display = 'none';
        }
    }
});