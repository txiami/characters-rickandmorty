
document.addEventListener("DOMContentLoaded", function () {
    const characterSelect = document.getElementById('characterSelect');
    function loadCharacters() {
        axios.get('https://rickandmortyapi.com/api/character')
            .then(function (response) {
                const characters = response.data.results;
                characters.forEach(function (character) {
                    const option = document.createElement('option');
                    option.value = character.id;
                    option.textContent = character.name;
                    characterSelect.appendChild(option);
                });
            })
            .catch(function (error) {
                console.error('Erro ao carregar personagens:', error);
            });
    }

    window.addEventListener('load', loadCharacters);
});


function findCharacters(id) {
    axios.get('https://rickandmortyapi.com/api/character/' + id)
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                console.log(response.data);
                showCharacterInfo(response.data)
            }
        })
        .catch(function (error) {
            console.error('Erro ao carregar personagem:', error);
        });
}

function showCharacterInfo(characterInfo) {
    clear()
    showEpisodes(characterInfo.episode)
    showNeighbors(characterInfo.origin)
    showCharacter(characterInfo)
}
function clear() {
    const episodeSelect = document.getElementById('episodeSelect');
    while (episodeSelect.firstChild) {
        episodeSelect.removeChild(episodeSelect.firstChild);
    }

    const neighborSelect = document.getElementById('neighborSelect');
    while (neighborSelect.firstChild) {
        neighborSelect.removeChild(neighborSelect.firstChild);
    }

}

function showEpisodes(data) {
    const episodeSelect = document.getElementById('episodeSelect');
    data.forEach(function (episode) {
        const option = document.createElement('option');
        option.value = episode;
        option.textContent = episode.slice(40);
        episodeSelect.appendChild(option);
    });
}


async function showNeighbors(data) {
    const neighborSelect = document.getElementById('neighborSelect');
    if (data.name === "unknown") {
        const option = document.createElement('option');
        option.textContent = "Nenhum local definido para este personagem";
        neighborSelect.appendChild(option);
        return
    }

    try {
        const residents = await findNeighbors(data.url);
        console.log(residents);
        residents.forEach(function (resident) {
            const option = document.createElement('option');
            option.value = resident;
            option.textContent = resident;
            neighborSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao exibir vizinhos:', error);
    }
}
async function findNeighbors(urlLocation) {

    try {
        const response = await axios.get(urlLocation);
        if (response.status == 200) {
            return await findResidentsNames(response.data.residents);
        }
    } catch (error) {
        console.error('Erro ao buscar residentes:', error);
    }
}

async function findResidentsNames(urls) {
    try {
        const residentsNames = [];
        for (const url of urls) {
            const response = await axios.get(url);
            if (response.status == 200) {
                residentsNames.push(response.data.name);
            }
        }
        return residentsNames;
    } catch (error) {
        console.error('Erro ao buscar nomes dos residentes:', error);
        return [];
    }
}

function showCharacter(data){
    const img = document.getElementById("img_do_personagem")
    const name = document.getElementById("nome_do_personagem")
    const status = document.getElementById("status_do_personagem")
    name.innerText = data.name   
    status.innerText = data.status
    img.src = data.image
}

