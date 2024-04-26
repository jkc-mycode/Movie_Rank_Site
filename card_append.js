// 매개변수로 받은 영화 정보를 HTML코드에 넣어서 HTML파일에 삽입
export const appendCard = (id, title, overview, posterPath, voteAverage, area) => {
    const html_tmp = `
    <div class="col">
        <div class="card">
            <img src="https://image.tmdb.org/t/p/original${posterPath}" class="card-img-top" alt="..." onclick="alert('영화 ID : ${id}')">
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