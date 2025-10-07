function simularProduccion() {
    const nD = parseInt(document.getElementById("nD").value);
    let dec = parseInt(document.getElementById("dec").value);
  
    if (!Number.isInteger(dec) || isNaN(dec)) dec = 2;
    dec = Math.min(Math.max(dec, 0), 10);
  
    let puP = 5.00;
    let puH = 1.50;
    let c = 0;
    let HP = 0;
    let THR = 0; // Huevos Rotos
    let THQ = 0; // Huevos Totales
    let TPS = 0; // Pollos Sobreviven
    let gNT = 0.0;
    let IPD = 0.0;
  
    let tabla = `
      <table>
        <tr>
          <th>Día</th>
          <th>r<sub>eP</sub></th>
          <th>Huevos Producidos (HP)</th>
          <th>Detalle incubación</th>
          <th>Rotos</th>
          <th>Huevos Sanos</th>
          <th>Pollos</th>
        </tr>
    `;
  
    while (c < nD) {
      c++;
      const reP = Math.random();
  
      // Determinar cantidad de huevos producidos (HP)
      if (reP <= 0.37) {
        tabla += `
          <tr>
            <td>${c}</td>
            <td>${reP.toFixed(dec)}</td>
            <td>0</td>
            <td>-</td>
            <td>${THR}</td>
            <td>${THQ}</td>
            <td>${TPS}</td>
          </tr>`;
        continue;
      } else if (reP <= 0.74) {
        HP = 1;
      } else if (reP <= 0.92) {
        HP = 2;
      } else if (reP <= 0.98) {
        HP = 3;
      } else {
        HP = 4;
      }
  
      let detalle = [];
  
      for (let i = 0; i < HP; i++) {
        const reH = Math.random();
  
        if (reH <= 0.2) {
          THR++;
          detalle.push(`${reH.toFixed(dec)} → roto`);
        } else if (reH <= 0.5) {
          const rEP = Math.random();
          if (rEP <= 0.2) {
            detalle.push(`${reH.toFixed(dec)}|${rEP.toFixed(dec)} → fallo`);
            continue;
          } else {
            TPS++;
            detalle.push(`${reH.toFixed(dec)}|${rEP.toFixed(dec)} → pollo`);
          }
        } else {
          THQ++;
          detalle.push(`${reH.toFixed(dec)} → huevo`);
        }
      }
  
      tabla += `
        <tr>
          <td>${c}</td>
          <td>${reP.toFixed(dec)}</td>
          <td>${HP}</td>
          <td>${detalle.join("<br>")}</td>
          <td>${THR}</td>
          <td>${THQ}</td>
          <td>${TPS}</td>
        </tr>`;
    }
  
    gNT = THQ * puH + TPS * puP;
    IPD = gNT / nD;
  
    const resumen = `
      <p><b>Resultados finales:</b></p>
      <ul>
        <li>Total Huevos Rotos: ${THR}</li>
        <li>Total Huevos Sanos: ${THQ}</li>
        <li>Total Pollos Sobrevivientes: ${TPS}</li>
        <li>Ganancia Neta Total: <b>${gNT.toFixed(dec)} Bs.</b></li>
        <li>Ingreso Promedio Diario: <b>${IPD.toFixed(dec)} Bs.</b></li>
      </ul>
    `;
  
    tabla += "</table>";
    document.getElementById("resultadoProduccion").innerHTML = resumen + tabla;
  }