const genresDropdown = document.getElementById('genresDropdown')
const buttonsUL = document.getElementById('buttonsUL')
const movieGenres = ['Action', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Thriller']

// const mappedGenres = movieGenres.map((genre) => {
//     return `
//     <option>
//         ${genre}
//     </option>
//     `
// }).join('')

// genresDropdown.insertAdjacentHTML('afterbegin', mappedGenres)
function displayGenreButtons() {
    
    const mappedGenres = movieGenres.map((genre) => {
        return `
        <li>
            <a href="/movies/genre/${genre}">
                <button>${genre}</button>
            </a>
        </li>
        `
    }).join('')
    buttonsUL.innerHTML = mappedGenres

}

displayGenreButtons()
// genresDropdown.insertAdjacentHTML('afterbegin', mappedGenres)

// genresDropdown.addEventListener('change', (event) => {
//     const genre = event.target.value
//     window.location.href = `localhost:3000/movies/genre/${genre}`
// })









// const buttonsUL = document.getElementById("buttonsUL")

// const url = 'http://localhost:3000/api/movies'



// function getMovies(url) {
//     fetch(url
//     ).then((response) => {
//         return response.json()
//     }).then((data) => {
//         getGenres(data)
//     }).catch((error) => {
//         return error;
//     })
// }

// getMovies(url)

// let movieGenres = [Action, Comedy, Romance, Musical]

// function getGenres(data) {
//     let movieGenre = data.map((movie) => {
//         return `<a href="http://localhost:3000/movies/genre/${movie.genre}">${movie.genre}</a>`
//     })
//     buttonsUL.innerHTML = movieGenre.join("-")
//     console.log(movieGenres)
// }

// let uniqueGenres = [...new Set(movieGenres)]
// console.log(uniqueGenres)
