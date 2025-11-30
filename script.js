// Smooth scroll + active nav highlight
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            const yOffset = -70; // header offset
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('fade-in-up')) {
                entry.target.classList.add('in-view');
            }
            if (entry.target.classList.contains('slide-in-left')) {
                entry.target.classList.add('in-view-left');
            }
            if (entry.target.classList.contains('slide-in-right')) {
                entry.target.classList.add('in-view-right');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
