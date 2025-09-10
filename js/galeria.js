document.addEventListener('DOMContentLoaded', function () {
  // Elementos del DOM
  const filtroAnos = document.querySelector('.filtro-anos');
  const filtroEventos = document.querySelector('.filtro-eventos');
  const btnFiltros = document.querySelectorAll('.btn-filtro');
  const itemsGaleria = document.querySelectorAll('.item-galeria');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.imagen-lightbox');
  const lightboxText = document.querySelector('.texto-lightbox');
  const cerrarLightbox = document.querySelector('.cerrar-lightbox');

  // Variables de estado
  let anoActual = 'todos';
  let eventoActual = 'todos';

  // Inicializar filtro de eventos como visible
  filtroEventos.style.display = 'flex';

  // Filtrado por año
  filtroAnos.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-filtro')) {
      // Actualizar botones de año
      btnFiltros.forEach((btn) => btn.classList.remove('active'));
      e.target.classList.add('active');
      anoActual = e.target.dataset.ano;

      // Resetear filtro de eventos al cambiar de año
      eventoActual = 'todos';
      document.querySelectorAll('.btn-evento').forEach((btn) => {
        btn.classList.remove('active');
      });
      document.querySelector('.btn-evento[data-evento="todos"]').classList.add('active');

      filtrarGaleria();
    }
  });

  // Filtrado por eventos
  filtroEventos.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-evento')) {
      document.querySelectorAll('.btn-evento').forEach((btn) => btn.classList.remove('active'));
      e.target.classList.add('active');
      eventoActual = e.target.dataset.evento;
      filtrarGaleria();
    }
  });

  // Función para filtrar la galería
  function filtrarGaleria() {
    itemsGaleria.forEach((item) => {
      const anoItem = item.dataset.ano;
      const eventoItem = item.dataset.evento;

      const coincideAno = anoActual === 'todos' || anoItem === anoActual;
      const coincideEvento = eventoActual === 'todos' || eventoItem === eventoActual;

      if (coincideAno && coincideEvento) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 200);
      }
    });
  }

  // Lightbox
  document.querySelectorAll('.item-galeria').forEach((item) => {
    item.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').src;
      const titulo = this.querySelector('h3').textContent;
      const fecha = this.querySelector('p').textContent;

      lightboxImg.src = imgSrc;
      lightboxText.innerHTML = `<h3>${titulo}</h3><p>${fecha}</p>`;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar lightbox
  cerrarLightbox.addEventListener('click', cerrarLightboxFunc);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) cerrarLightboxFunc();
  });

  function cerrarLightboxFunc() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Filtrar al cargar la página
  filtrarGaleria();
});
