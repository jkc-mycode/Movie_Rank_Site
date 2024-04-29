import { appendCard } from "./card_append.js";
import { getMovieDataList } from "./data_manage.js";

const $movieCards = document.querySelector("#movieCards");
const $searchContent = document.getElementById("search_content");
const $searchBtn = document.getElementById("search_btn");


// 제목으로 영화 검색
const searchMovie = () => {
    if ($searchContent.value === "") {
        window.alert("검색할 제목을 입력해주세요!!");
    } else {
        // 현재 카드 리스트를 삭제
        $movieCards.replaceChildren();
        getMovieDataList().filter((item) => {
            // 제목과 입력한 내용을 전부 소문자로 바꿔서 비교
            let lowerTitle = item.title.toLowerCase();
            let lowerContent = $searchContent.value.toLowerCase();

            if (lowerTitle.includes(lowerContent)) {
                appendCard(item.id, item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
            }
        });
    }
}

// 버튼에 클릭으로 검색 이벤트 추가
export const clickSearchBtn = () => {
    $searchBtn.addEventListener("click", () => {
        searchMovie();
    });
}


// 엔터 입력 시 검색 이벤트 추가
export const clickSearchEnter = () => {
    window.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
            searchMovie();
        }
    });
}
