function fetchFact() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fact').innerText = data.value;
        })
        .catch(error => console.error('Upsss, Chuck is tired of you:', error));
}

document.getElementById('newFactButton').addEventListener('click', fetchFact);

// Fetch a joke on initial load
fetchFact();