// 1. Initialize Icons
lucide.createIcons();

// 2. 3D Tilt Logic
function handleTilt(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}
function resetTilt(e) {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
}
document.querySelectorAll('.project-card, .card, .stat-card').forEach(el => {
    el.addEventListener('mousemove', handleTilt);
    el.addEventListener('mouseleave', resetTilt);
});

// 3. Navigation with Sliding Pill
function switchTab(tabId, btnElement) {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Move Backdrop
    if(btnElement) {
        const navBackdrop = document.getElementById('navBackdrop');
        const rect = btnElement.getBoundingClientRect();
        const navRect = document.querySelector('.nav-list').getBoundingClientRect();
        
        // On mobile, hide backdrop if pill logic gets messy, or calculate properly
        if(window.innerWidth > 1024) {
            navBackdrop.style.width = `${rect.width}px`;
            navBackdrop.style.left = `${rect.left - navRect.left}px`;
            navBackdrop.style.opacity = '1';
        }
    }

    // Update Classes
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(tabId)) link.classList.add('active');
    });
    document.querySelectorAll('article').forEach(art => art.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    // Trigger Animation Re-run
    setTimeout(handleScroll, 100);
    
    // Typing effect only on 'about'
    if(tabId === 'about') runTypingEffect();
}

// 4. Scroll Reveal & Counters
function handleScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.skill-fill');
    const counters = document.querySelectorAll('.stat-number');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) el.classList.add('active');
    });

    skillFills.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.style.width = el.getAttribute('data-width');
        }
    });

    counters.forEach(counter => {
        const elementTop = counter.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            const target = +counter.getAttribute('data-count');
            let count = 0;
            const increment = target / 50;
            const updateCount = () => {
                count += increment;
                if(count < target) {
                    counter.innerText = Math.ceil(count) + "+";
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        }
    });
}
window.addEventListener('scroll', handleScroll);

// 5. Typing Text Effect
const typingElement = document.getElementById('typing-text');
const words = ["Frontend Developer", "BCA Student", "Problem Solver"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
let typingTimeout;

function runTypingEffect() {
    if(typingTimeout) clearTimeout(typingTimeout);
    
    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingTimeout = setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingTimeout = setTimeout(type, 500);
        } else {
            typingTimeout = setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    type();
}

// 6. Terminal Effect
const term = document.getElementById('terminalOutput');
const lines = [
    "vansh@portfolio: ~", "➜", "> initializing environment...", "➜", 
    "> loading modules: [react, node, design]...", "➜", 
    "> connecting to github.com/vanshjaggi...", "➜", 
    "> status: OPEN_TO_WORK", "➜", "> system ready. welcome user."
];
let lineIndex = 0;
function terminalType() {
    if(lineIndex < lines.length) {
        const div = document.createElement('div');
        div.className = 'cmd-line';
        if(lines[lineIndex].includes('>')) div.style.color = "#94a3b8";
        if(lines[lineIndex].includes('OPEN_TO_WORK')) div.style.color = "#10b981";
        if(lines[lineIndex] === '➜') div.style.color = "var(--accent)";
        div.innerText = lines[lineIndex];
        term.appendChild(div);
        lineIndex++;
        setTimeout(terminalType, 400);
    }
}

// 7. Theme Logic
function setTheme(hue) {
    document.documentElement.style.setProperty('--primary-hue', hue);
    document.getElementById('colorPanel').classList.remove('active');
}
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('themeIcon');
    icon.className = document.body.classList.contains('light-mode') ? 'fas fa-sun' : 'fas fa-moon';
}

// 8. Command Palette & Navigation
document.addEventListener('keydown', e => {
    if((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('cmdOverlay').classList.add('open');
        document.getElementById('cmdInput').focus();
    }
    if(e.key === 'Escape') document.getElementById('cmdOverlay').classList.remove('open');
});
document.getElementById('cmdOverlay').addEventListener('click', (e) => {
    if(e.target === document.getElementById('cmdOverlay')) document.getElementById('cmdOverlay').classList.remove('open');
});

function navTo(page) {
    const targetBtn = Array.from(document.querySelectorAll('.nav-link')).find(btn => btn.getAttribute('onclick').includes(page));
    switchTab(page, targetBtn);
    document.getElementById('cmdOverlay').classList.remove('open');
}

// 9. Project Filtering
function filterProjects(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.project-card').forEach(card => {
        if(cat === 'all' || card.dataset.category === cat) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 50);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Magnetic Buttons Logic
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// Init
window.onload = () => {
    const activeBtn = document.querySelector('.nav-link.active');
    switchTab('about', activeBtn);
    terminalType();
    handleScroll();
};