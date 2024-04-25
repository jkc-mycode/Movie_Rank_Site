const $movieCards = document.querySelector("#movieCards");
const $searchContent = document.getElementById("search_content");
const $searchBtn = document.getElementById("search_btn");
const $moveTopBtn = document.getElementById("move_top_btn");
const $moveBottomBtn = document.getElementById("move_bottom_btn");
const $cursor = document.getElementById("cursor");
let movieDataList = [];  // 검색에서 사용할 전역 데이터 리스트


// TMDB API 정보
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjRmZDY5YzZkNTk3OThhMmRkNmM1YWY2NTc4YTYzNCIsInN1YiI6IjY2MjhhMzQzMzc4MDYyMDE3ZWRhNTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_c4jW2oTJJgwosGcrlqmYFVUfXks1TtdTfTZcEea3M'
    }
};

// TMDB에서 페이지번호에 따라 데이터를 가져오는 함수
const loadData = async (pageNum) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}`, options)
        const data = await res.json();
        data.results.forEach(item => {
            appendCard(item.id, item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
            movieDataList.push(item);  // 검색에서 사용할 전역 데이터 리스트
        });

        // 커서 모양 변화 함수
        // cursorChange();
    } catch(err) {
        console.error(err);
    }
    
}

// 매개변수로 받은 영화 정보를 HTML코드에 넣어서 HTML파일에 삽입
const appendCard = (id, title, overview, posterPath, voteAverage, area) => {
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

            if (lowerTitle.includes(lowerContent)) {
                appendCard(item.id, item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
            }
        });
    }
}

// 커서 모양 변화 함수 (생각보다 별로라서 사용X)
const cursorChange = () => {
    
    window.addEventListener("mousemove", (e) => {
        // display 속성을 변경하여 fadeIn 효과 구현
        $cursor.style.display = "block";
        $cursor.style.top = e.pageY - 13 + "px";
        $cursor.style.left = e.pageX - 13 + "px";
    });

    // 대상 요소들에 대한 mouseover 이벤트 리스너 추가
    document.querySelectorAll(".card, .btn, .move_top_bottom, input, a, textarea, button").forEach((el) => {
        el.addEventListener("mouseover", () => {
            $cursor.style.width = "50px";
            $cursor.style.height = "50px";
            $cursor.style.background = "yellow";
            $cursor.style.opacity = 0.7;
        });

        el.addEventListener("mouseout", () => {
            $cursor.style.width = "25px";
            $cursor.style.height = "25px";
            $cursor.style.background = "yellow";
            $cursor.style.opacity = 1;
        });
    });
}



// 페이지 로딩 시 실행
window.onload = async () => {
    // 처음 로딩 시 1페이지 출력
    await loadData(1);

    // 페이지 로드 시 검색 창에 포커스
    $searchContent.focus();

    // Top 이동 버튼
    $moveTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Bottom 이동 버튼
    $moveBottomBtn.addEventListener("click", () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });

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

    // 유사 Pagination 구현
    const $pageValue = document.querySelectorAll(".page-item");
    const $activeClass = document.getElementsByClassName("active");
    $pageValue.forEach((item) => {
        item.addEventListener("click", async () => {
            // 페이지 버튼의 활성화를 위한 코드
            $activeClass[1].className = $activeClass[1].className.replace(" active", "");
            item.className += " active";

            $movieCards.replaceChildren();
            movieDataList = [];
            await loadData(item.value);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}