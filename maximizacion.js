function maximizar() {
  const nmax = parseInt(document.getElementById("nmax").value);
  const dec = parseInt(document.getElementById("dec").value);

  let c = 0;
  let z = 0;
  let x1 = 0, x2 = 0, x3 = 0;

  let tabla = `
    <table>
      <tr>
        <th>Iteración (c)</th>
        <th>rx1</th>
        <th>x1 = 10*rx1</th>
        <th>rx2</th>
        <th>x2 = 100*rx2</th>
        <th>rx3</th>
        <th>x3 = 1+rx3</th>
        <th>Z = 2x1 + 3x2 - x3</th>
        <th>Z Máx</th>
      </tr>
  `;

  while (c < nmax) {
    c++;

    // Generar números aleatorios
    const rx1c = Math.random();
    const x1c = 10 * rx1c;
    const rx2c = Math.random();
    const x2c = Math.round(100 * rx2c);

    // Condición principal
    if (x1c + x2c >= 2) {
      const rx3c = Math.random();
      const x3c = 1 + rx3c;
      const zc = 2 * x1c + 3 * x2c - x3c;

      // Actualizar si mejora el máximo
      if (zc > z) {
        z = zc;
        x1 = x1c;
        x2 = x2c;
        x3 = x3c;
      }

      tabla += `
        <tr>
          <td>${c}</td>
          <td>${rx1c.toFixed(dec)}</td>
          <td>${x1c.toFixed(dec)}</td>
          <td>${rx2c.toFixed(dec)}</td>
          <td>${x2c.toFixed(dec)}</td>
          <td>${rx3c.toFixed(dec)}</td>
          <td>${x3c.toFixed(dec)}</td>
          <td>${zc.toFixed(dec)}</td>
          <td>${z.toFixed(dec)}</td>
        </tr>
      `;
    }
  }

  tabla += "</table>";

  const resumen = `
    <p><b>Resultado final:</b></p>
    <ul>
      <li>Z máximo = <b>${z.toFixed(dec)}</b></li>
      <li>x₁ = ${x1.toFixed(dec)}</li>
      <li>x₂ = ${x2.toFixed(dec)}</li>
      <li>x₃ = ${x3.toFixed(dec)}</li>
    </ul>
  `;

  document.getElementById("resultadoMax").innerHTML = resumen + tabla;
}
