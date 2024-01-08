// URL de la API de Chuck Norris
const API_URL ='https://api.chucknorris.io/';

// Función para buscar un chiste
function searchJoke() {
    // Obtener la categoría seleccionada del menú desplegable
    const category = document.getElementById('category').value;
    // Obtener el contenedor de resultados
    const resultsContainer = document.getElementById('results');

    // Limpiar resultados anteriores
    resultsContainer.innerHTML = '';

    // Hacer una solicitud a la API para obtener un chiste aleatorio
    fetch(`${API_URL}jokes/random`)
        .then(response => response.json())
        .then(data => {
            // Mostrar el chiste obtenido en pantalla
            const joke = data.value;
            console.log('Chiste obtenido:', joke);

            // Crear una tarjeta con el chiste
            const card = document.createElement('div');
            card.classList.add('card');

            const jokeText = document.createElement('p');
            jokeText.textContent = joke;
            card.appendChild(jokeText);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.addEventListener('click', () => saveJoke(joke));
            card.appendChild(saveButton);

            // Agregar la tarjeta al contenedor de resultados
            resultsContainer.appendChild(card);
        })
}

// Array para almacenar chistes guardados
const savedJokes = [];

// Función para guardar un chiste
function saveJoke(joke) {
    // Verificar si el chiste ya está guardado
    if (savedJokes.includes(joke)) {
        console.log('El chiste ya está guardado:', joke);
        return;
    }

    // Agregar el chiste al array de chistes guardados
    savedJokes.push(joke);

    // Actualizar la interfaz para reflejar el cambio
    updateSavedJokesUI();

    console.log('Chiste guardado:', joke);
}

// Función para actualizar la interfaz con los chistes guardados
function updateSavedJokesUI() {
    // Obtener el contenedor de chistes guardados
    const savedJokesContainer = document.getElementById('savedJokes');
    // Limpiar la sección de chistes guardados
    savedJokesContainer.innerHTML = '';

    // Mostrar los chistes guardados en la interfaz
    savedJokes.forEach((savedJoke, index) => {
        const savedJokeCard = document.createElement('div');
        savedJokeCard.classList.add('card');

        const jokeText = document.createElement('p');
        jokeText.textContent = savedJoke;
        savedJokeCard.appendChild(jokeText);

        savedJokesContainer.appendChild(savedJokeCard);
    });

    // Agregar el botón para borrar todos los chistes guardados
    const deleteAllButton = document.createElement('button');
    deleteAllButton.textContent = 'Borrar Todos';
    deleteAllButton.addEventListener('click', deleteAllJokes);
    savedJokesContainer.appendChild(deleteAllButton);
}

// Función para borrar todos los chistes guardados
function deleteAllJokes() {
    // Borrar todos los chistes guardados
    savedJokes.length = 0;

    // Actualizar la interfaz para reflejar el cambio
    updateSavedJokesUI();
}
