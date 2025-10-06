function calcularCapital(){
  let t = parseInt(document.getElementById("tiempo").value);
  let k = parseFloat(document.getElementById("dineroDepositado").value);
  let opc = document.querySelector('input[name="opcionInteres"]:checked').value;
  let dec = parseInt(document.getElementById("dec").value);

  let c = 0;
  let i = 0.0;
  let I = 0.0;

  if (opc == 1){
    i = 0.035;
  } else {
    if (k<=10000.00){
        i = 0.035;
    } else if (k<=50000.00){
        i = 0.037;
    } else {
        i = 0.04;
    }
  }

  let info = `
    <p><b>Parámetros calculados:</b></p>
    <ul>
      <li>i = ${i}</li>
    </ul>
 `;

  let kf = k;
  let tabla = "<table><tr><th>c</th><th>i*kf</th><th>I</th><th>kf+I</th><th>kf</th></tr>";
  while (c<t){
    c = c + 1;
    I = i*kf;
    kf = kf+I;
    tabla += `<tr>
                <td>${c}</td>
                <td>${i}(${k.toFixed(dec)})</td>
                <td>${k.toFixed(dec)}</td>
                <td>${k.toFixed(dec)}+${I.toFixed(dec)}</td>
                <td>${kf.toFixed(dec)}</td>
              </tr>`;
    k = kf;
  }
  tabla += "</table>";

  document.getElementById("resultadoDep").innerHTML = info + tabla;
}