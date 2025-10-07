// Evita valores negativos en todos los inputs numéricos
function evitarNegativos() {
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (parseFloat(input.value) < 0) {
        input.value = Math.abs(input.value); // Corrige automáticamente a 0
      }
    });
  });
}
