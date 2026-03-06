document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Observer para animaciones suaves
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.50 });

    // 2. Carga de JSON y Renderizado
    async function loadProjects() {
        const container = document.getElementById('projects-container');
        try {
            const res = await fetch('proyectos.json');
            const data = await res.json();

            container.innerHTML = data.map(p => `
                <article class="card">
                    <span class="tag">${p.tecnologia}</span>
                    <h3>${p.titulo}</h3>
                    <p>${p.descripcion}</p>
                   <a href="${p.link}" class="link-action" target="_blank" rel="noopener noreferrer">Detalles →</a>
                </article>
            `).join('');

            // Observar las nuevas cards creadas
            document.querySelectorAll('.card').forEach(c => revealObserver.observe(c));
        } catch (err) {
            container.innerHTML = "<p>Error cargando proyectos.</p>";
        }
    }

    // 3. Formulario con feedback suave
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = "Enviando...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        setTimeout(() => {
            alert("¡Mensaje enviado con éxito!");
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
            form.reset();
        }, 1500);
    });

    // Iniciar carga y observar elementos estáticos
    loadProjects();
    revealObserver.observe(form);
    
    // Sombra del Nav al scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        nav.style.boxShadow = window.scrollY > 20 ? "0 4px 10px rgba(0,0,0,0.05)" : "none";
    });

});
