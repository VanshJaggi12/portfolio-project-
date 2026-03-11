// 1. Initialize Icons
lucide.createIcons();

// 2. Three.js Background
const initThreeJS = () => {
    const canvas = document.getElementById('canvas3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const isLight = document.body.classList.contains('light-mode');
    const colorHex = isLight ? 0x059669 : 0x10b981;

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: colorHex,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 2;

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate3D = () => {
        requestAnimationFrame(animate3D);
        particlesMesh.rotation.y += 0.001; 
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += mouseX * 0.03;
        particlesMesh.rotation.x += mouseY * 0.03;
        renderer.render(scene, camera);
    };
    animate3D();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.particlesMaterial = particlesMaterial;
};

// 3. Navigation with Sliding Pill
function switchTab(tabId, btnElement) {
    window.scrollTo(0, 0);
    
    if(btnElement) {
        const navBackdrop = document.getElementById('navBackdrop');
        const rect = btnElement.getBoundingClientRect();
        const navRect = document.querySelector('.nav-list').getBoundingClientRect();
        
        if(window.innerWidth > 1024) {
            navBackdrop.style.width = `${rect.width}px`;
            navBackdrop.style.left = `${rect.left - navRect.left}px`;
            navBackdrop.style.opacity = '1';
        }
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(tabId)) link.classList.add('active');
    });
    document.querySelectorAll('article').forEach(art => art.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    setTimeout(handleScroll, 100);
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
const words = ["Backend Engineer", "BCA Student", "AI & Automation Builder"];
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

// 6. Terminal Boot Effect
const term = document.getElementById('terminalOutput');
const lines = [
    "> initializing core...",
    "> loading modules: [python, fastapi, langchain, n8n]...", 
    "> connecting to api.github.com/VanshJaggi12...", 
    "> status: ACTIVE (OpenToWork)",
    "> all systems nominal. ready for deployment."
];
let lineIndex = 0;
function terminalType() {
    if(lineIndex < lines.length) {
        const div = document.createElement('div');
        div.className = 'cmd-line';
        if(lines[lineIndex].includes('ACTIVE')) div.style.color = "#10b981";
        else div.style.color = "#94a3b8";
        
        div.innerHTML = `<span style="color:var(--accent); margin-right:8px;">➜</span> ${lines[lineIndex]}`;
        term.appendChild(div);
        lineIndex++;
        setTimeout(terminalType, 600);
    }
}

// 7. Theme Logic
function setTheme(hue) {
    document.documentElement.style.setProperty('--primary-hue', hue);
    document.getElementById('colorPanel').classList.remove('active');
}
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    document.getElementById('themeIcon').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    
    if(window.particlesMaterial) {
        window.particlesMaterial.color.setHex(isLight ? 0x059669 : 0x10b981);
    }
}

// 8. Command Palette
document.addEventListener('keydown', e => {
    if((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('cmdOverlay').classList.add('open');
        document.getElementById('cmdInput').focus();
    }
    if(e.key === 'Escape') {
        document.getElementById('cmdOverlay').classList.remove('open');
        closeModal();
    }
});
document.getElementById('cmdOverlay').addEventListener('click', (e) => {
    if(e.target === document.getElementById('cmdOverlay')) document.getElementById('cmdOverlay').classList.remove('open');
});

function navTo(page) {
    const targetBtn = Array.from(document.querySelectorAll('.nav-link')).find(btn => btn.getAttribute('onclick').includes(page));
    switchTab(page, targetBtn);
    document.getElementById('cmdOverlay').classList.remove('open');
}

// 9. Project Rendering & Filtering
// Updated project data with specific image placeholders and descriptions
const projectsData = [
    {
        id: 1, title: "AI Agent Orchestration Flow", category: "ai",
        // Specific image for AI Flow
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        desc: "Developed a multi-step AI agent flow utilizing LangChain and LangGraph for complex problem solving.",
        challenge: "Needed a system capable of breaking down vague user requests into executable steps with tool use.",
        solution: "Built a stateful graph using LangGraph where an LLM (Gemini) decides the next tool or step.",
        tech: ["LangChain", "LangGraph", "Python", "Google Gemini API"]
    },
    {
        id: 2, title: "Cross-Service Automation", category: "ai",
        // Specific image for Automation
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        desc: "Implemented a workflow using n8n to connect a customer service frontend with backend task management.",
        challenge: "Customer inquiries from a landing page form needed immediate, triaged logging in a project board.",
        solution: "Created an n8n workflow triggered by webhook, processed via Python, and pushed data to a Trello board API.",
        tech: ["n8n", "Python", "REST APIs", "Automation"]
    },
    {
        id: 3, title: "Robust FastAPI Backend", category: "web",
        // Specific image for Backend
        img: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&q=80",
        desc: "Designed and deployed a tested REST API for managing internal resources, including JWT authentication.",
        challenge: "Existing solution was untyped, untested, and hard to scale, leading to bugs.",
        solution: "Rebuilt using FastAPI with Pydantic for validation, SQLAlchemy for ORM, and PyTest for high coverage.",
        tech: ["Python", "FastAPI", "SQLAlchemy", "PyTest", "JWT"]
    },
    {
        id: 4, title: "Personal Portfolio Website", category: "web",
        // Specific image for Portfolio
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        desc: "This modern portfolio website showcasing projects and academic focus.",
        challenge: "Creating a centralized hub to display academic and personal projects professionally.",
        solution: "Designed a clean, modern UI featuring a 3D background, command palette, and modal case studies.",
        tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Three.js"]
    }
];

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    
    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
    
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card tilt-element reveal active'; 
        card.onclick = () => openModal(p.id);
        
        card.innerHTML = `
            <img src="${p.img}" alt="${p.title}">
            <div class="project-overlay">
                <h4>${p.title}</h4>
                <span>${p.tech.slice(0, 3).join(' • ')}</span>
            </div>
        `;
        grid.appendChild(card);
    });
    init3DTilt(); 
}

function filterProjects(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(cat);
}

// Modal Logic
const modalOverlay = document.getElementById('projectModal');
function openModal(id) {
    const p = projectsData.find(x => x.id === id);
    if(!p) return;

    document.getElementById('m-title').innerText = p.title;
    document.getElementById('m-category').innerText = p.category.toUpperCase();
    document.getElementById('m-challenge').innerText = p.challenge;
    document.getElementById('m-solution').innerText = p.solution;
    document.getElementById('m-tech').innerHTML = p.tech.map(t => 
        `<span style="background:var(--bg-body); padding:5px 12px; border-radius:20px; margin-right:8px; border:1px solid var(--border); display:inline-block; margin-bottom:8px;">${t}</span>`
    ).join('');

    modalOverlay.classList.add('active');
}
function closeModal() { modalOverlay.classList.remove('active'); }
modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeModal(); });

// 10. Magnetic Buttons & 3D Tilt Logic
function init3DTilt() {
    function handleTilt(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
    function resetTilt(e) {
        e.currentTarget.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    }
    document.querySelectorAll('.tilt-element').forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });
}

function initMagneticButtons() {
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
}

// Init
window.onload = () => {
    initThreeJS();
    const activeBtn = document.querySelector('.nav-link.active');
    switchTab('about', activeBtn);
    renderProjects('all');
    initMagneticButtons();
    init3DTilt();
    
    setTimeout(terminalType, 800);
};