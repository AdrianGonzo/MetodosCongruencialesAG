function simularVentas() {
    const nH = parseInt(document.getElementById("nH").value);
    const cv = parseFloat(document.getElementById("cv").value);
    const pvu = parseFloat(document.getElementById("pvu").value);
    const cfd = parseFloat(document.getElementById("cfd").value);
    const dec = parseInt(document.getElementById("dec").value);
  
    let c = 0;
    let TArt = 0;
    let gN = 0;
    let tabla = `
      <table>
        <tr>
          <th>Día</th>
          <th>r<sub>cl</sub></th>
          <th>Clientes (llc)</th>
          <th>r<sub>ac</sub> (por cliente)</th>
          <th>Artículos vendidos (por cliente)</th>
          <th>Total artículos acumulado</th>
        </tr>
    `;
  
    while (c < nH) {
      c++;
      const rcl = Math.random();
      let llc = Math.round(0 + (4 - 0) * rcl);
  
      if (llc === 0) {
        tabla += `
          <tr>
            <td>${c}</td>
            <td>${rcl.toFixed(dec)}</td>
            <td>0</td>
            <td>-</td>
            <td>-</td>
            <td>${TArt}</td>
          </tr>`;
        continue;
      }
  
      let detalleClientes = [];
      while (llc > 0) {
        const rac = Math.random();
        let avc = 0;
  
        if (rac >= 0 && rac <= 0.2) {
          avc = 0;
        } else if (rac > 0.2 && rac <= 0.5) {
          avc = 1;
        } else if (rac > 0.5 && rac <= 0.9) {
          avc = 2;
        } else {
          avc = 3;
        }
  
        TArt += avc;
        detalleClientes.push(`${rac.toFixed(dec)} → ${avc}`);
        llc--;
      }
  
      tabla += `
        <tr>
          <td>${c}</td>
          <td>${rcl.toFixed(dec)}</td>
          <td>${detalleClientes.length}</td>
          <td>${detalleClientes.join("<br>")}</td>
          <td>${TArt}</td>
          <td>${TArt}</td>
        </tr>`;
    }
  
    gN = TArt * (pvu - cv) - cfd;
  
    const resumen = `
      <p><b>Resultados finales:</b></p>
      <ul>
        <li>Ganancia Neta: <b>${gN.toFixed(dec)} Bs.</b></li>
        <li>Total de Artículos Vendidos: ${TArt}</li>
        <li>Precio de Venta Unitario: ${pvu} Bs.</li>
        <li>Costo Unitario: ${cv} Bs.</li>
        <li>Costo Fijo Diario: ${cfd} Bs.</li>
      </ul>
    `;
  
    tabla += "</table>";
    document.getElementById("resultadoVentas").innerHTML = resumen + tabla;
  }