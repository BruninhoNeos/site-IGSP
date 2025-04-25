// Mostrar/esconder botão ao rolar
window.onscroll = function() {
    const btn = document.getElementById("btnTopo");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
  
  // Rolar ao topo ao clicar
  document.getElementById("btnTopo").onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  ScrollReveal().reveal('.mes-agenda', {
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    delay: 100,
    easing: 'ease-in-out',
    reset: false // coloca true se quiser que a animação repita ao rolar
  });

  ScrollReveal().reveal('.mes-agenda h2', {
    origin: 'left',
    distance: '20px',
    duration: 600,
    delay: 50,
    easing: 'ease-in-out'
  });