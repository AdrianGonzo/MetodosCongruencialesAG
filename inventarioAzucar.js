function simularInventario() {
  const nmd = parseInt(document.getElementById("nmd").value);
  const cbod = parseFloat(document.getElementById("cbod").value);
  const dec = parseInt(document.getElementById("dec").value);

  // Variables endógenas
  let cord = 100.00;
  let cui = 0.10;
  let cua = 3.50;
  let pvu = 5.00;
  let cd = 0;
  let inazu = cbod;
  let gnt = 0, dit = 0, ctot = 0;
  let cdi = 0, cta = cbod * cua, cto = cord, ibru = 0;

  // Estado
  let dazu = 0, rdazu = 0;
  let tent = 0, rtent = 0, pazu = 0;

  let tabla = `
    <table>
      <tr>
        <th>Día</th>
        <th>Inventario inicial</th>
        <th>Demanda (dazu)</th>
        <th>Inventario final</th>
        <th>Pedido (pazu)</th>
        <th>Tiempo entrega (tent)</th>
        <th>Ingresos brutos</th>
        <th>Costo inventario</th>
        <th>Costo total</th>
      </tr>
  `;

  while (cd < nmd) {
    cd++;

    // Si hay un pedido pendiente
    if (tent !== 0) {
      tent--;
      if (tent === 0) {
        inazu += pazu;
        cto += cord;
      }
    }

    // Cada 7 días se realiza un pedido
    if (cd % 7 === 0) {
      pazu = cbod - inazu;
      cta += pazu * cua;
      rtent = Math.random();
      tent = Math.round(1 + (3 - 1) * rtent); // 1 a 3 días
    }

    // Demanda diaria (distribución exponencial)
    rdazu = Math.random();
    dazu = Math.round(-100 * Math.log(1 - rdazu));

    if (dazu > inazu) {
      dit += dazu - inazu;
      ibru += inazu * pvu;
      inazu = 0;
    } else {
      ibru += dazu * pvu;
      inazu -= dazu;
      cdi += inazu * cui;
    }

    ct = cdi + cta + cto;

    tabla += `
      <tr>
        <td>${cd}</td>
        <td>${(inazu + dazu > cbod ? cbod : inazu + dazu).toFixed(dec)}</td>
        <td>${dazu}</td>
        <td>${inazu.toFixed(dec)}</td>
        <td>${pazu}</td>
        <td>${tent}</td>
        <td>${ibru.toFixed(dec)}</td>
        <td>${cdi.toFixed(dec)}</td>
        <td>${ct.toFixed(dec)}</td>
      </tr>
    `;
  }

  gnt = ibru - ct;
  ctot = ct;

  tabla += "</table>";

  const resumen = `
    <p><b>Resultados finales:</b></p>
    <ul>
      <li>Ganancia neta total: <b>${gnt.toFixed(dec)} Bs.</b></li>
      <li>Costo total: ${ctot.toFixed(dec)} Bs.</li>
      <li>Demanda insatisfecha total: ${dit.toFixed(dec)}</li>
    </ul>
  `;

  document.getElementById("resultadoInv").innerHTML = resumen + tabla;
}
