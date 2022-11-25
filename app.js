$(document).ready(function () {
    $.get("https://www.omdbapi.com/?s=batman&apikey=d8461f2b", function (data) {
        let movies = data?.Search
        let output = ""
        $.each(movies, (index, movie) => {
            output += `
        <div class="col-md-4 shadow p-3">
          <div class="well center">
            <img src="${movie.Poster}" class="img-fluid" />
             <h6 class="mt-1">${movie.Title}</h6>
            <a  data-id="${movie.imdbID}" class="btn btn-primary movie-href" href="#">Movie Details</a>
          </div>
        </div>
        `
            $('#movies').html(output)
        }) 
    })
    $("#searchForm").on('submit', function (e) {
        e.preventDefault()
        const search_value = $("#searchText").val()
        getMovies(search_value)
    })
})

function getMovies(search_value) {
    const url=`https://www.omdbapi.com/?s=${search_value}&apikey=d8461f2b`
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
            <a  data-id="${movie.imdbID}" class="btn btn-primary movie-href" href="#">Movie Details</a>
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

$("#movies").on("click",('.movie-href'),function (e) {
        const id = $(this).data('id')
    //Works similar to local storage but this one clears once we close the applicatios
    sessionStorage.setItem('movieId', id)
    window.location = "movie.html"
    return false
}
)




function getMovie() {
    let movie_id = sessionStorage.getItem('movieId')
    const url=`https://www.omdbapi.com/?i=${movie_id}&apikey=d8461f2b`
    axios.get(url)
        .then((response) => {
            let movie = response.data
            console.log(movie)
            let output = `
    <div class="card mb-3 p-3">
      <h3 class="card-header my-3">${movie.Title}</h3>
      <div class="card-body">
      </div>
      <section class="row g-3">
      <div class="image col-md-4">
        <img src="${movie.Poster}" class="image-fluid">
      </div>
      <ul class="list-group col-md-8">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
    </ul>
      </section>
      
      <div class="row">
        <div class="well">
          <h3 class="mt-3">Plot</h3>
          ${movie.Plot}
          <hr />
          <a
            href="https://imdb.com/title/${movie.imdbID}"
            target="_blank"
            class="btn btn-primary"
            >View IMDB</a
          >
          <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
      </div>
    </div>
  </body>
        `

      $('#movie').html(output);

        })
        .catch(err => {
        console.log(err)
    })
}