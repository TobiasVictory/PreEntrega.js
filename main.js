function calcularIVA(numero) {
  const IVA = 0.21;

  if (isNaN(numero)) {
    console.log("Por favor, ingrese un número válido.");
    return;
  }

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

let deseaCalcular = true;
let precios = [];
let precio;
do {
  precio = prompt("Ingrese un precio para calcular el IVA (escriba 'salir' para terminar)");

  if (precio.toLowerCase() === "salir") {
    deseaCalcular = false;
  } else {
    precios.push(parseFloat(precio));
  }
} while (deseaCalcular);

let resultados = precios.map(calcularIVA);
console.log(resultados);