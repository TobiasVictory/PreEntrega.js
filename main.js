let precios = [];

precios = fetchPreciosDesdeLocalStorage();

function fetchPreciosDesdeLocalStorage() {
  return new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem('precios');
      resolve(JSON.parse(data));
    } catch (error) {
      reject(`Error al cargar los precios desde el local storage: ${error}`);
    }
  });
}

function agregarPrecio() {
  const precioInput = document.getElementById('precio');
  const precio = parseFloat(precioInput.value);

  if (isNaN(precio) || precio <= 0) {
    console.log("Por favor, ingrese un número válido mayor a cero.");
    return;
  }

  precios.push(precio);
  precioInput.value = "";

  guardarPreciosEnLocalStorage(precios);
  mostrarResultados();
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

  if (precios.length > 0) {
    resultadosDiv.innerHTML = precios.map(precio => {
      let resultado = calcularIVA(precio);

      return `
        <p>
          Precio sin IVA: $${resultado.precioSinIVA}<br>
          Monto IVA: $${resultado.montoIVA}<br>
          Precio total con IVA: $${resultado.precioTotalConIVA}<br>
          Descuento: $${resultado.descuento}<br>
          Total a pagar: $${resultado.totalAPagar}
        </p>
      `;
    }).join('');
  }
}

function guardarPreciosEnLocalStorage(precios) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('precios', JSON.stringify(precios));
      resolve();
    } catch (error) {
      reject(`Error al guardar los precios en el local storage: ${error}`);
    }
  });
}

function cargarPreciosDesdeLocalStorage() {
  return fetchPreciosDesdeLocalStorage()
    .then(data => {
      precios = data;
      mostrarResultados();
    })
    .catch(error => {
      console.error('Error al cargar los precios desde el local storage:', error);
    });
}

const toastify = document.querySelector("#toastify");

toastify.addEventListener("click", () => {
    Toastify({
        text: "Click",
        duration: 3000,
        destination: "https://ar.pinterest.com/pin/668925350927945929/",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
},
      onClick: function(){} 
}).showToast();
})