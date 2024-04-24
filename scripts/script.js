document.addEventListener("DOMContentLoaded", function() {
  const characterSelect = document.getElementById('characterSelect');

  function loadCharacters() {
      axios.get('https://rickandmortyapi.com/api/character')
          .then(function(response) {
              const characters = response.data.results;
              characters.forEach(function(character) {
                  const option = document.createElement('option');
                  option.value = character.id;
                  option.textContent = character.name;
                  characterSelect.appendChild(option);
              });
          })
          .catch(function(error) {
              console.error('Erro ao carregar personagens:', error);
          });
  }

  window.addEventListener('load', loadCharacters);
});
