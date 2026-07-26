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

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrolled = window.scrollY;
  
  if (scrolled > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // --- FITUR: Scroll Progress Bar ---
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolledPercentage = (scrolled / height) * 100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
      progressBar.style.width = scrolledPercentage + "%";
  }

  // --- FITUR: Parallax Effect ---
  const heroContainer = document.querySelector('.header-container');
  if (heroContainer) {
      heroContainer.style.transform = `translateY(${scrolled * 0.35}px)`;
      heroContainer.style.opacity = 1 - (scrolled / 700);
  }

  // --- FITUR: Scroll Spy ---
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 250)) {
          currentSection = section.getAttribute('id');
      }
  });

  navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href').includes(currentSection) && currentSection !== '') {
          link.classList.add('active-link');
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- FITUR: Typing Animation (Bersih Tanpa Kursor Kedap-kedip) ---
    const texts = ["Creative Director.",
    "Visual Storyteller.",
    "Digital Content Strategist.",
    "Event Photographer.",
    "Cinematic Videographer."];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;

    function type() {
        if(count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if(isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

       const typewriterElement = document.getElementById('typewriter');
        if (typewriterElement) {
            // Jika huruf habis, ganti dengan spasi (&nbsp;) agar tinggi layout tidak hancur
            typewriterElement.innerHTML = letter === '' ? '&nbsp;' : letter;
        }

        let typeSpeed = 100;
        if(isDeleting) { typeSpeed /= 2; } 

        if(!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if(isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; 
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    // --- Fitur Filter Project ---
    const seeMoreBtn = document.getElementById('see-more-btn');
    const projectCards = document.querySelectorAll('.project .card-link-wrapper');
    const projectsContainer = document.getElementById('projects');
    const projectsToShowDefault = 9;

    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    
    if (customSelectWrapper) {
        const trigger = customSelectWrapper.querySelector('.custom-select-trigger');
        const triggerText = trigger.querySelector('.trigger-text');
        const optionsList = customSelectWrapper.querySelector('.custom-options');
        const options = customSelectWrapper.querySelectorAll('.custom-option');

        trigger.addEventListener('click', () => {
            optionsList.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.getAttribute('data-value');
                const selectedText = option.textContent;

                triggerText.textContent = selectedText;
                optionsList.classList.remove('open');
                applyFilter(selectedValue);
            });
        });

        window.addEventListener('click', (e) => {
            if (!customSelectWrapper.contains(e.target)) {
                optionsList.classList.remove('open');
            }
        });
    }

    function applyFilter(filterValue) {
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
    } 

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const triggerText = customSelectWrapper ? customSelectWrapper.querySelector('.trigger-text').textContent : 'All Projects';
            const selectedOption = Array.from(customSelectWrapper.querySelectorAll('.custom-option')).find(opt => opt.textContent === triggerText);
            const activeFilter = selectedOption ? selectedOption.getAttribute('data-value') : 'all';
            
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

    applyFilter('all');

    const projectIcons = document.querySelectorAll('.project-link-icon');
    projectIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation();

            const card = this.closest('.card');
            const desc = card.querySelector('.project-description');
            
            if (desc) {
                desc.classList.toggle('show-desc');
            }
            
            this.classList.toggle('active');
        });
    });

    // --- Scroll Animation Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

});