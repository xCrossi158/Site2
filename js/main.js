// Código para o carrossel da seção "Nosso espaço"
document.addEventListener('DOMContentLoaded', function() {
    // Configurações do carrossel
    const carrossel = document.querySelector('.espaco-carrossel');
    const slidesContainer = document.querySelector('.espaco-slides');
    const slides = document.querySelectorAll('.espaco-slide');
    const dotsContainer = document.querySelector('.espaco-dots');
    const prevButton = document.querySelector('.espaco-prev');
    const nextButton = document.querySelector('.espaco-next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Inicializa os indicadores (dots)
    function createDots() {
        dotsContainer.innerHTML = ''; // Limpa dots existentes para evitar duplicações
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('espaco-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        // Atualiza a posição dos slides usando transformação do container inteiro
        // em vez de transformar cada slide individualmente
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Garante que todos os slides são visíveis e posicionados corretamente
        slides.forEach((slide, index) => {
            slide.style.display = 'block';
            slide.style.minWidth = '100%'; // Garante que cada slide ocupa 100% da largura
        });
        
        // Atualiza os indicadores ativos
        const dots = document.querySelectorAll('.espaco-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navega para um slide específico
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        
        // Gerencia os limites do carrossel
        if (currentSlide < 0) {
            currentSlide = slideCount - 1;
        } else if (currentSlide >= slideCount) {
            currentSlide = 0;
        }
        
        updateCarousel();
    }
    
    // Event listeners para os botões de navegação
    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    // Inicializa o carrossel
    createDots();
    
    // Configura os slides inicialmente
    slides.forEach((slide, index) => {
        slide.style.minWidth = '100%';
        slide.style.display = 'block';
    });
    
    // Inicializa o primeiro slide
    goToSlide(0);
    
    // Adiciona suporte para navegação por toque (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carrossel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay(); // Pausa durante o toque
    });
    
    carrossel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay(); // Reinicia após o toque
    });
    
    function handleSwipe() {
        const swipeThreshold = 30; // Reduzido para maior sensibilidade
        
        // Detecta a direção do swipe e navega
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda
            goToSlide(currentSlide + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita
            goToSlide(currentSlide - 1);
        }
    }
    
    // Opcionalmente, adiciona rotação automática
    let autoPlayInterval;
    
    function startAutoPlay() {
        stopAutoPlay(); // Evita múltiplos intervalos
        autoPlayInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // Muda a cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Inicia a reprodução automática
    startAutoPlay();
    
    // Pausa a reprodução automática quando o usuário interage
    carrossel.addEventListener('mouseenter', stopAutoPlay);
    carrossel.addEventListener('mouseleave', startAutoPlay);
    
    // Adiciona event listener para lidar com mudanças de visibilidade da página
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Adiciona event listener para lidar com redimensionamento da janela
    window.addEventListener('resize', function() {
        updateCarousel(); // Atualiza o carrossel quando a janela é redimensionada
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel
    const slidesContainer = document.querySelector('.transformacoes-slides');
    const slides = document.querySelectorAll('.transformacoes-slide');
    const dotsContainer = document.querySelector('.transformacoes-dots');
    const dots = document.querySelectorAll('.transformacoes-dot');
    const prevButton = document.querySelector('.transformacoes-prev');
    const nextButton = document.querySelector('.transformacoes-next');
    
    // Variáveis de controle
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Inicialização
    updateCarouselPosition();
    
    // Função para atualizar a posição do carrossel
    function updateCarouselPosition() {
        // Mover os slides
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualizar os pontos indicadores
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Função para ir para um slide específico
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarouselPosition();
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarouselPosition();
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarouselPosition();
    }
    
    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Adicionar event listeners aos pontos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Navegação por teclado (acessibilidade)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Toques em dispositivos móveis (opcional)
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // Detectar direção do swipe (pelo menos 50px de movimento)
        if (touchStartX - touchEndX > 50) {
            nextSlide(); // Swipe para esquerda
        } else if (touchEndX - touchStartX > 50) {
            prevSlide(); // Swipe para direita
        }
    }
    
    // Opcional: Auto-rotação do carrossel (descomente para ativar)
    
    const autoRotateInterval = 5000; // 5 segundos
    let carouselInterval = setInterval(nextSlide, autoRotateInterval);
    
    // Parar a rotação automática quando o usuário interagir
    const carouselElements = [slidesContainer, prevButton, nextButton, ...dots];
    carouselElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        element.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, autoRotateInterval);
        });
        
        element.addEventListener('touchstart', () => {
            clearInterval(carouselInterval);
        });
    });
    
});
