document.addEventListener('DOMContentLoaded', function() {
  // Obtener el input de búsqueda
    const searchBox = document.getElementById('search-box');
  
    // Obtener el contenedor de los resultados
    const resultBox = document.getElementById('result');
  
    // Lista de las páginas estáticas a buscar
    const pages = ['index.html', 'hobbies.html', 'plants.html', 'projects.html', 'sport.html'];
  
    // Función para cargar el contenido de las páginas
    async function loadPages() {
      const results = []; // Aquí guardaremos los resultados
   
      // Iterar sobre las páginas
      for (let page of pages) {
        const response = await fetch(page);
        const html = await response.text();
      
        // Crear un contenedor temporal para analizar el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
           
        // Obtener todos los elementos dentro del 'content' (que es donde está tu contenido principal)
        const content = doc.getElementById('content');
        if (content) {
          const items = content.querySelectorAll('p,h3,label,li'); // Aquí se puede ajustar según tus necesidades
     
          // Iterar sobre los elementos y buscar coincidencias
          items.forEach((item) => {
    console.log(item)
            const text = item.textContent.toLowerCase();
            if (text.includes(searchBox.value.toLowerCase())) {
      console.log(item)
              // Si hay coincidencia, agregar al array de resultados
              results.push({
                page: page,
                title: content.querySelector('h2') ? content.querySelector('h2').textContent : 'Sin título', // Suponemos que cada página tiene un <h1> o título
                content: item.textContent,
                link: `${page}#${item.id || item.className || 'unknown'}`, // Agregar un enlace a la sección de la coincidencia
              });
            }
          });
        }
      }
  
      // Mostrar los resultados en el contenedor
      showResults(results);
    }
  
    // Mostrar los resultados en el contenedor
    function showResults(results) {
          resultBox.innerHTML ='';
  
     
         document.getElementById('results-header').visibility = "visible";

      if (results.length > 0) {
    
        results.forEach(result => {
          const resultDiv = document.createElement('div');
          resultDiv.classList.add('result-item');
          
          // Crear un enlace a la coincidencia
           resultDiv.innerHTML = `
            <h3>En ${result.title}</h3>
            <p>${result.content}</p>
            <a href="${result.link}" target="_blank">Ver más</a>
         `;
          
          resultBox.appendChild(resultDiv);
        });
      } else {
        resultBox.textContent = 'No se encontraron resultados.';
      }
    }
  
    // Añadir evento de búsqueda en el input
    searchBox.addEventListener('input', function() {
      if (searchBox.value.trim() === '') {
        resultBox.textContent = ''; // Si el campo está vacío, no mostrar resultados
      } else {
        loadPages();
      }
    })
  })
  