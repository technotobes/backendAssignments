const buttonsUL = document.getElementById("buttonsUL")

const url = 'http://localhost:3000/api/movies'

function getMovies(url) {
    fetch(url
    ).then((response) => {
        return response.json()
    }).then((data) => {
        getGenres(data)
    }).catch((error) => {
        return error;
    })
}

getMovies(url)

let movieGenres = [Action, Comedy, Romance, Musical]

function getGenres(data) {
    let movieGenre = data.map((movie) => {
        return `<a href="http://localhost:3000/movies/genre/${movie.genre}">${movie.genre}</a>`
    })
    buttonsUL.innerHTML = movieGenre.join("-")
    console.log(movieGenres)
}

// function removeDuplicates(movieGenres) {
//     return [...new Set(movieGenres)]
// }

let uniqueGenres = [...new Set(movieGenres)]
console.log(uniqueGenres)
