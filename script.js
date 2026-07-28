document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializar AOS (Animações ao Rolar)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 2. Efeito de Digitação
    new Typed('.typed-text', {
        strings: ['Desenvolvimento Humano', 
        'Saúde Integral', 
        'Psicomotricidade Relacional', 
        'Qualidade de Vida'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // 3. Efeito no Header ao Rolar
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Menu Mobile Toggle
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
	
	// --- LÓGICA DO SLIDER DE FOTOS ---
// --- SLIDER DE FOTOS AUTOMÁTICO ---
// --- LÓGICA DO SLIDER DE FOTOS ---
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide-img');
const dots = document.querySelectorAll('.dot-item');
let slideInterval;

function showSlide(index) {
    if (slides.length === 0) return;

    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides.forEach((slide, i) => {
        if (i === currentSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, i) => {
        if (i === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function currentSlide(index) {
    showSlide(index);
    resetTimer();
}

function startSlideTimer() {
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000); // Troca a cada 5 segundos para apreciar o efeito lento de 1.8s
}

function resetTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

if (slides.length > 0) {
    startSlideTimer();
}
	

    // 5. ENVIO ASSÍNCRONO DO FORMULÁRIO (SEM SAIR DA PÁGINA)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Impede o redirecionamento da página

            // Altera botão para estado de envio
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
            formStatus.style.color = '#94a3b8';
            formStatus.innerHTML = 'Enviando sua mensagem...';

            const formData = new FormData(this);

            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Feedback de Sucesso na própria página
                    formStatus.style.color = '#25d366'; // Verde
                    formStatus.innerHTML = '✨ Mensagem enviada com sucesso! A Profª Dais Cardoso responderá em breve.';
                    contactForm.reset();
                } else {
                    // Erro retornado pelo Formspree
                    formStatus.style.color = '#f87171'; // Vermelho
                    formStatus.innerHTML = '❌ Ops! Ocorreu um problema ao enviar. Verifique o código do Formspree.';
                }
            } catch (error) {
                // Erro de rede/conexão
                formStatus.style.color = '#f87171';
                formStatus.innerHTML = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
            } finally {
                // Restaura o botão ao estado original
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Enviar Mensagem <i class="fa-solid fa-paper-plane"></i>';
            }
        });
    }
});