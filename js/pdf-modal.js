document.addEventListener('DOMContentLoaded', function () {
  // Elementos del modal
  const modal = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfViewer');
  const closeBtn = document.querySelector('.close-modal');

  // Configurar todos los botones PDF
  document.querySelectorAll('.pdf-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const pdfUrl = this.getAttribute('data-pdf');
      openPdfModal(pdfUrl);
    });
  });

  // Función para abrir modal
  function openPdfModal(pdfUrl) {
    pdfViewer.src = pdfUrl;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar modal
  function closePdfModal() {
    pdfViewer.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Event listeners
  closeBtn.addEventListener('click', closePdfModal);

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closePdfModal();
    }
  });
});
