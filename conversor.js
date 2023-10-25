/* Datos */
const datos = document.querySelector(".entrada");
const boton = document.querySelector("#btn");

// Definir la clave de la API, la moneda base y las monedas objetivo
const apiKey = 'f9a6fe32ea3d1a0cfb9beb0113396267';
const baseCurrency = 'EUR';
const targetCurrencies = 'USD';

// Definir la URL de la API con los parámetros correspondientes
const apiUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}&base=${baseCurrency}&symbols=${targetCurrencies}`;

// Crear una función asincrónica que haga la solicitud a la API y muestre el resultado
// Agregar un evento al botón para hacer la conversión al hacer clic
boton.addEventListener("click", async function convertirMoneda() {
    // Obtener el valor en euros del input
    let valorEnEuro = datos.value;
    valorEnEuro = Number(valorEnEuro);

    // Hacer la solicitud a la API usando fetch y esperar la respuesta
    const response = await fetch(apiUrl);

    // Verificar si la respuesta es exitosa
    if (response.ok) {
        // Convertir la respuesta a un objeto JSON
        const data = await response.json();

        // Obtener el valor del dólar respecto al euro del campo rates.USD
        const cotizacionEnDolares = data.rates.USD;

        // Hacer la conversión de euros a dólares, multiplicando el valor en euros por la cotización en dólares
        let valorFinal = valorEnEuro * cotizacionEnDolares;

        // Redondear el resultado a dos decimales
        valorFinal = valorFinal.toFixed(2);

        // Mostrar el resultado en el elemento HTML
        let elemento = document.getElementById("mostrar");
        elemento.innerHTML = valorFinal;
    } else {
        // Lanzar un error si la respuesta no es exitosa
        throw new Error(`HTTP error: ${response.status}`);
    }
});