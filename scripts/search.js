document.addEventListener('DOMContentLoaded', function() {
//coge el el input que es la caja de búsqueda
    const searchBox = document.getElementById('search-box');


  //coge la sección con la que se envuelven todos los resultados
    const resultBox = document.getElementById('resultBox');
  
   //Se pasan TODAS las páginas web porque se quiere que el buscador mire en todas
    const pages = ['index.html', 'hobbies.html', 'plants.html', 'projects.html', 'sport.html'];
  

    /**
     * Carga los datos que se cogen de las páginas.
     * Se buscan coincidencias para los siguientes elementos html:
     *  -párrafos
     *  -etiquetas de formularios
     *  -encabezados de niveles 3 al 5 
     *  -Elementos de lista
     *  -Elementos que pertenezcan a una tabla
     *  -Encabezados de tablas
     *  -En las leyendas de tablas
     */
    async function loadPages() {
      const results = []; 
   
      // Por cada página de la web
      for (let page of pages) {
        //se hace una petición para coger todo su contenido.
        const response = await fetch(page);
        const html = await response.text();
      
        //se transforma el contenido de la respuesta al hacer el fetch en un DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
           
        // sE Obtienen todos los elementos dentro del 'content' ( los elementos relevantes están envueltos en el html en un main con ese id)
        const content = doc.getElementById('content');
        if (content) {
          const items = content.querySelectorAll('p, form, h2, h3, h4, h5, li, table, th, caption');
     
          // Se iteraan los los elementos 
          items.forEach((item) => {

            const text = item.textContent.toLowerCase();//se pasa a minúsculas para evitar que sea senssitivo a mayúsculas
            if (text.includes(searchBox.value.toLowerCase())) { //Se comrprueba la coincidencia

              // Si hay coincidencia, agregar al array de resultados
              results.push({
                page: page,
                title: content.querySelector('h2') ? content.querySelector('h2').textContent : 'Sin título', //para mostrar de dónde salió el resultado
                content: item.textContent, //el contenido
                link: `${page}#${item.id || item.className || 'unknown'}`, // para agregar un enlace a la sección de la coincidencia
              });
            }
          });
        }
      }
  
      // Mostrar los resultados en el contenedor
      showResults(results);
    }
  
   /**
    * Función que renderiza los contenidos resultados de la búsqueda.
    * @param {*} results , las resultados de búsqueda a pintar.
    */
    function showResults(results) {
      resultBox.innerHTML=``;
 
         

      if (results.length > 0) { //si hay coinicdencias
    
        results.forEach(result => {//por cada una de ellas
          const resultDiv = document.createElement('div'); 
          resultDiv.classList.add('result-item');
          
          // Crear un enlace a la coincidencia
           resultDiv.innerHTML = `
            <h3>En ${result.title}</h3>
            <p>${result.content}</p>
            <a href="${result.link}" >Ver más</a>
         `;
          
          resultBox.appendChild(resultDiv); //se añade al conjunto de resultados
        });
      } else {
        resultBox.textContent = 
        resultDiv.innerHTML = `
 
        <p class="noResultsFeedback">No se encontraron resultados.</p>
 
     `;
      }
    }
  
    // Añadir evento de búsqueda en el input para que se ejecute cuando se interacciona
    searchBox.addEventListener('input', function() {
      if (searchBox.value.trim() === '') {
        resultBox.textContent = ''; // Si el campo está vacío, no mostrar resultados
      } else {
        loadPages();
      }
    })
  })
  