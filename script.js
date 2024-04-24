const $movieCards = document.querySelector("#movieCards");
const $userInput = document.querySelector("#guessField");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjRmZDY5YzZkNTk3OThhMmRkNmM1YWY2NTc4YTYzNCIsInN1YiI6IjY2MjhhMzQzMzc4MDYyMDE3ZWRhNTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_c4jW2oTJJgwosGcrlqmYFVUfXks1TtdTfTZcEea3M'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(res => res.json())
    .then((res) => {
        console.log(res.results);
        res.results.forEach(item => {
            appendCard(item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
        });
    })
    .catch(err => console.error(err));


const appendCard = (title, overview, posterPath, voteAverage, area) => {
    const html_tmp = `
    <div class="col">
        <div class="card">
            <img src="https://image.tmdb.org/t/p/w200${posterPath}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="font-weight: bold;"> ${title} </h5>
                <br>
                <p class="card-text"> ${overview} </p>
                <p class="vote_rate"><b> Rating : ${voteAverage} </b></p>
            </div>
        </div>
    </div>
    `
    area.insertAdjacentHTML("beforeend", html_tmp);
}