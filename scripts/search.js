document.addEventListener('DOMContentLoaded', function() {

  const searchBox = document.getElementById('search-box');


  const resultBox = document.getElementById('result');


  const pages = ['index.html', 'hobbies.html', 'plants.html', 'projects.html', 'sport.html'];

  async function loadPages() {
    const results = []; 

  
    for (let page of pages) {
      const response = await fetch(page);
      const html = await response.text();
      

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      

      const content = doc.getElementById('content');
      if (content) {
        const items = content.querySelectorAll('p,h2,h3,h4,li,label');

    
        items.forEach((item) => {
          const text = item.textContent.toLowerCase();
          if (text.includes(searchBox.value.toLowerCase())) {

            results.push({
              page: page,
              title: content.querySelector('h2') ? content.querySelector('h2').textContent : 'Sin título',
              content: item.textContent,
              link: `${page}#${item.id || item.className || 'unknown'}`, 
            });
          }
        });
      }
    }


    showResults(results);
  }

  function showResults(results) {
    resultBox.innerHTML = ''; 
    if (results.length > 0) {
      results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-item');
        
   
        resultDiv.innerHTML = `
          <p>En ${result.title}</p>
          <p>${result.content}</p>
          <a href="${result.link}" target="_blank">Ver más</a>
        `;
        
        resultBox.appendChild(resultDiv);
      });
    } else {
      resultBox.textContent = 'No se encontraron resultados.';
    }
  }


  searchBox.addEventListener('input', function() {
    if (searchBox.value.trim() === '') {
      resultBox.textContent = '';
    } else {
      loadPages();
    }
  })
})

