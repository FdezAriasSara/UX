 

document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById('input-buscar');
    const btnBuscar = document.getElementById('btn-buscar');
    const resultados = document.getElementById('resultados');
    const contenido = document.getElementById('contenido');

    // Función para buscar y resaltar texto
    function buscarTexto() {
     
        const textoBuscar = inputBuscar.value.trim().toLowerCase();
        const parrafos = contenido.querySelectorAll('p, h2, h1, h3, li, label, a');

        let encontrado = 0;

        // Quitar resaltado previo
        parrafos.forEach(parrafo => {
            parrafo.innerHTML = parrafo.textContent; // Restaurar texto original
        });

        // Resaltar coincidencias
        parrafos.forEach(parrafo => {
            const textoOriginal = parrafo.textContent;
            const indice = textoOriginal.toLowerCase().indexOf(textoBuscar);

            if (indice !== -1 && textoBuscar !== '') {
                const antes = textoOriginal.slice(0, indice);
                const match = textoOriginal.slice(indice, indice + textoBuscar.length);
                const despues = textoOriginal.slice(indice + textoBuscar.length);

                // Resaltar el texto
                parrafo.innerHTML = `${antes}<span class="highlight">${match}</span>${despues}`;
                encontrado++;
            }
        });

        // Mostrar resultados
        resultados.textContent = encontrado > 0
            ? `Se encontraron ${encontrado} coincidencia(s).`
            : 'No se encontraron resultados.';
    }

    // Evento al hacer clic en "Buscar"
    btnBuscar.addEventListener('click', buscarTexto);

    // Buscar automáticamente al escribir
    inputBuscar.addEventListener('input', buscarTexto);
});
