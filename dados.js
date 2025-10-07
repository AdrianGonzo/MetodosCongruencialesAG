function simularDados() {
  const nJ = parseInt(document.getElementById("nJ").value);
  const dec = parseInt(document.getElementById("dec").value);

  let iu = 2.00;
  let cu = 5.00;
  let c = 0;
  let gN = 0.0;
  let nJG = 0;
  let tabla = `
    <table>
      <tr>
        <th>Juego (c)</th>
        <th>r₁</th>
        <th>r₂</th>
        <th>Dado 1</th>
        <th>Dado 2</th>
        <th>Suma</th>
        <th>Resultado</th>
        <th>Ganancia Neta (Bs)</th>
      </tr>
  `;

  while (c < nJ) {
    c++;
    gN += iu; // gana inicialmente

    const r1 = Math.random();
    const r2 = Math.random();
    const dado1 = Math.round(1 + (6 - 1) * r1);
    const dado2 = Math.round(1 + (6 - 1) * r2);
    const suma = dado1 + dado2;

    let resultado = "Gana";
    if (suma === 7) {
      gN -= cu; // pierde
      resultado = "Pierde (7)";
    } else {
      nJG++;
    }

    tabla += `
      <tr>
        <td>${c}</td>
        <td>${r1.toFixed(dec)}</td>
        <td>${r2.toFixed(dec)}</td>
        <td>${dado1}</td>
        <td>${dado2}</td>
        <td>${suma}</td>
        <td>${resultado}</td>
        <td>${gN.toFixed(dec)}</td>
      </tr>
    `;
  }

  const pJG = (nJG / nJ) * 100;
  tabla += "</table>";

  const resumen = `
    <p><b>Resultados finales:</b></p>
    <ul>
      <li>Ganancia Neta Total: <b>${gN.toFixed(dec)} Bs.</b></li>
      <li>Juegos Ganados: ${nJG}</li>
      <li>Porcentaje de Juegos Ganados: ${pJG.toFixed(2)}%</li>
    </ul>
  `;

  document.getElementById("resultadoDados").innerHTML = resumen + tabla;
}
