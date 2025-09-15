// Función para verificar si un número es primo
function esPrimo(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Encuentra el primo menor más cercano a m
function primoMenorCercano(m) {
  for (let i = m - 1; i >= 2; i--) {
    if (esPrimo(i)) return i;
  }
  return 2; // fallback
}

function generarLineal() {
  // Entradas del usuario
  let X0 = parseInt(document.getElementById("semillaLineal").value);
  let k = parseInt(document.getElementById("kLineal").value);
  let p = parseInt(document.getElementById("pLineal").value);
  let dec = parseInt(document.getElementById("decLineal").value);

  // Cálculo de parámetros
  let g = Math.round(Math.log(p) / Math.log(2)); // entero positivo más cercano
  if (g < 1) {
    g = 1;
  } // seguridad
  let m = Math.pow(2, g);
  let a = 1 + 4 * k;
  let c = primoMenorCercano(m);

  // Mostrar parámetros calculados
  let info = `
    <p><b>Parámetros calculados:</b></p>
    <ul>
      <li>g = ${g}</li>
      <li>m = ${m}</li>
      <li>a = ${a}</li>
      <li>c = ${c}</li>
    </ul>
  `;

  // Generar números
  let xi = X0;
  let tabla = "<table><tr><th>i</th><th>((a * Xi-1) + c) mod (m)</th><th>Xi</th><th>Xi / (m - 1) </th><th>Ri</th></tr>";

  for (let i = 0; i < p+1; i++) {
    xi = (a * xi + c) % m;
    tabla += `<tr>
                <td>${i + 1}</td>
                <td>(${a}(${xi}) + ${c}) mod (${m})</td>
                <td>${xi}</td>
                <td>${xi} / (${m} - 1)
                <td>${(xi / (m-1)).toFixed(dec)}</td>
              </tr>`;
  }

  tabla += "</table>";

  document.getElementById("resultadoLineal").innerHTML = info + tabla;
}

function generarMultiplicativo(){
  let X0 = parseInt(document.getElementById("semillaMult").value);
  let k = parseInt(document.getElementById("kMult").value);
  let p = parseInt(document.getElementById("pMult").value);
  let dec = parseInt(document.getElementById("decMult").value);
  let opc = document.querySelector('input[name="opcionMult"]:checked').value;

  let g = Math.round((Math.log(p)/Math.log(2))+2);
  let m = Math.pow(2, g);

  if (g - 1){
    g = 1;
  }

  let a = 3 + (8 * k);

  if (opc === "1"){
    a = 3 + (8 * k);
  }
  else if (opc === "2"){
    a = 5 + (8 * k);
  }

  let info = `
    <p><b>Parámetros calculados:</b></p>
    <ul>
      <li>g = ${g}</li>
      <li>m = ${m}</li>
      <li>a = ${a}</li>
    </ul>
  `;

  let xi = X0;
  let tabla = "<table><tr><th>i</th><th>((a * Xi-1)) mod (m)</th><th>Xi</th><th>Xi / (m - 1) </th><th>Ri</th></tr>";

  for (let i = 0; i < p + 1; i++){
    xi = (a * xi) % m;
    tabla += `<tr>
                <td>${i + 1}</td>
                <td>(${a}(${xi})) mod (${m})</td>
                <td>${xi}</td>
                <td>${xi} / (${m} - 1)
                <td>${(xi / (m-1)).toFixed(dec)}</td>
              </tr>`;
  }

  tabla += "</table>";

  document.getElementById("resultadoMultiplicativo").innerHTML = info + tabla;

}