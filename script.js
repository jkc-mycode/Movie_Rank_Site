const $movieCards = document.querySelector("#movieCards");
const $searchContent = document.getElementById("search_content");
const $searchBtn = document.getElementById("search_btn");
const movieDataList = [];  // 검색에서 사용할 전역 데이터 리스트

// TMDB API 정보
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjRmZDY5YzZkNTk3OThhMmRkNmM1YWY2NTc4YTYzNCIsInN1YiI6IjY2MjhhMzQzMzc4MDYyMDE3ZWRhNTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_c4jW2oTJJgwosGcrlqmYFVUfXks1TtdTfTZcEea3M'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(res => res.json())
    .then(async (res) => {
        res.results.forEach(item => {
            appendCard(item.id, item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
            movieDataList.push(item);  // 검색에서 사용할 전역 데이터 리스트
        });
    })
    .catch(err => console.error(err));


// 매개변수로 받은 영화 정보를 HTML코드에 넣어서 HTML파일에 삽입
const appendCard = (id, title, overview, posterPath, voteAverage, area) => {
    const html_tmp = `
    <div class="col">
        <div class="card">
            <img src="https://image.tmdb.org/t/p/w200${posterPath}" class="card-img-top" alt="..." onclick="alert('영화 ID : ${id}')">
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

// 제목으로 영화 검색
const searchMovie = () => {
    if ($searchContent.value === "") {
        window.alert("검색할 제목을 입력해주세요!!");
    } else {
        // 현재 카드 리스트를 삭제
        $movieCards.replaceChildren();
        movieDataList.filter((item) => {
            // 제목과 입력한 내용을 전부 소문자로 바꿔서 비교
            let lowerTitle = item.title.toLowerCase();
            let lowerContent = $searchContent.value.toLowerCase();
            
            if (lowerTitle.includes(lowerContent)){
                appendCard(item.id, item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
            }
        });
    }
}


// 페이지 로딩 시 실행
window.onload = () => {
    // 버튼에 클릭으로 검색 이벤트 추가
    $searchBtn.addEventListener("click", () => {
        searchMovie();
    });

    // 엔터 입력 시 검색 이벤트 추가
    window.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
            searchMovie();
        }
    });
    
    $searchContent.focus();
}