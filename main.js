let precios = cargarPreciosDesdeLocalStorage() || [];

function agregarPrecio() {
  const precioInput = document.getElementById('precio');
  const precio = parseFloat(precioInput.value);

  if (isNaN(precio)) {
    console.log("Por favor, ingrese un número válido.");
    return;
  }

  precios.push(precio);
  precioInput.value = "";

  guardarPreciosEnLocalStorage(precios);
  mostrarResultados();

  if (isNaN(precio)) {
    tosify.notify({
      message: 'Por favor, ingrese un número válido.',
      type: 'error'
    });
    return;
  }
}

function calcularIVA(numero) {
  const IVA = 0.21;

  let iva = numero * IVA;
  let totalConIVA = numero + iva;
  let descuento = calcularDescuento(totalConIVA);
  let totalAPagar = totalConIVA - descuento;

  let objeto = {
    precioSinIVA: numero.toFixed(2),
    montoIVA: iva.toFixed(2),
    precioTotalConIVA: totalConIVA.toFixed(2),
    descuento: descuento.toFixed(2),
    totalAPagar: totalAPagar.toFixed(2)
  };

  return objeto;
}

function calcularDescuento(monto) {
  let descuento = 0;

  if (monto > 5000 && monto < 10000){
    descuento = monto * 0.15;
  }

  return descuento;
}

function mostrarResultados() {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = "";

  precios.forEach(function(precio) {
    let resultado = calcularIVA(precio);

    let resultadoHTML = `
      <p>
        Precio sin IVA: $${resultado.precioSinIVA}<br>
        Monto IVA: $${resultado.montoIVA}<br>
        Precio total con IVA: $${resultado.precioTotalConIVA}<br>
        Descuento: $${resultado.descuento}<br>
        Total a pagar: $${resultado.totalAPagar}
      </p>
    `;

    resultadosDiv.innerHTML += resultadoHTML;
  });
}

function guardarPreciosEnLocalStorage(precios) {
  localStorage.setItem('precios', JSON.stringify(precios));
}

function cargarPreciosDesdeLocalStorage() {
  const preciosJSON = localStorage.getItem('precios');
  return JSON.parse(preciosJSON);
}