const track = document.getElementById('carrosselCards');
const btnPrev = document.querySelector('.seta.esquerda');
const btnNext = document.querySelector('.seta.direita');

let currentIndex = 0;
let autoScrollInterval;

function getCardsPerPage() {
  if (window.innerWidth < 700) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function updateCarousel() {
  const cardsPerPage = getCardsPerPage();
  const card = track.querySelector('.card');
  const cardStyle = getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  const offset = currentIndex * cardWidth * cardsPerPage;
  track.style.transform = `translateX(-${offset}px)`;
}

function moveNext() {
  const cardsPerPage = getCardsPerPage();
  const totalCards = track.querySelectorAll('.card').length; // CORRIGIDO
  const maxIndex = Math.ceil(totalCards / cardsPerPage) - 1;

  currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0;
  updateCarousel();
}

function movePrev() {
  const cardsPerPage = getCardsPerPage();
  const totalCards = track.querySelectorAll('.card').length; // CORRIGIDO
  const maxIndex = Math.ceil(totalCards / cardsPerPage) - 1;

  currentIndex = (currentIndex > 0) ? currentIndex - 1 : maxIndex;
  updateCarousel();
}

function startAutoScroll() {
  autoScrollInterval = setInterval(moveNext, 4000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Botões
btnNext.addEventListener('click', moveNext);
btnPrev.addEventListener('click', movePrev);

// Pausar ao passar o mouse
track.addEventListener('mouseenter', stopAutoScroll);
track.addEventListener('mouseleave', startAutoScroll);

// Resize
window.addEventListener('resize', updateCarousel);

// Inicialização
updateCarousel();
startAutoScroll();

// Funcionalidade de arrastar com o mouse (drag-to-scroll simulado por mudança de página)
let isDragging = false;
let startX = 0;
let hasMoved = false;

track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  hasMoved = false;
  track.classList.add('dragging');
  stopAutoScroll();
});

document.addEventListener('mouseup', () => {
  if (isDragging && !hasMoved) {
    track.classList.remove('dragging');
    startAutoScroll();
  }
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.pageX - startX;

  // Só aciona uma vez por arraste
  if (dx > 50) {
    movePrev();
    hasMoved = true;
    isDragging = false;
  } else if (dx < -50) {
    moveNext();
    hasMoved = true;
    isDragging = false;
  }
});




// Funcionalidade para o botão Agenda (Home)
document.addEventListener("DOMContentLoaded", function () {
  const eventoCard = document.getElementById("eventoCard");
  const contatoSection = document.getElementById("contato");

  // Animação de exibição inicial
  setTimeout(() => {
    void eventoCard.offsetWidth;
    eventoCard.classList.add("show");
  }, 1000);

  // Observer para esconder o botão ao entrar na seção de contato
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          eventoCard.style.display = "none";
        } else {
          eventoCard.style.display = "block";
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  if (contatoSection) {
    observer.observe(contatoSection);
  }
});

