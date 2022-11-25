$(document).ready(function () {
    $("#searchForm").on('submit', function (e) {
        e.preventDefault()
        const search_value = $("#searchText").val()
        getMovies(search_value)
    })
})

function getMovies(search_value) {
    const url=`http://www.omdbapi.com/?s=${search_value}&apikey=d8461f2b`
    axios.get(url)
        .then((response) => {
            let movies = response?.data?.Search
            let output=""
            //iterating thru the movies array
            $.each(movies, (index, movie) => {
                output += `
        <div class="col-md-4 shadow p-3">
          <div class="well center">
            <img src="${movie.Poster}" class="img-fluid" />
            <h6 class="mt-1">${movie.Title}</h6>
            <a id ='movie-href' data-id={${movie.imdbID}} class="btn btn-primary" href="#">Movie Details</a>
          </div>
        </div>
                `
            });
            $('#movies').html(output)
        })
        .catch(err => {
        console.log(err)
    })
}

$("#movie").on("click",$('#movie-href'), function selectedMovie(e) {
    //Works similar to local storage but this one clears once we close the applicatios
    /*sessionStorage.setItem('moviesId', id)
    window.location = "movie.html"
    return false*/
}
)



function getMovie() {
    let movie_id = sessionStorage.getItem('movieId') ? sessionStorage.getItem('movieId') : ''
    const url=`http://www.omdbapi.com/?i=${movie_id}&apikey=d8461f2b`
    axios.get(url)
        .then((response) => {
            console.log(response)
        })
        .catch(err => {
        console.log(err)
    })
}