import { appendCard } from "./card_append.js";
import { searchMovieData } from "./data_load.js";


const $movieCards = document.querySelector("#movieCards");
const $searchContent = document.getElementById("search_content");
const $searchBtn = document.getElementById("search_btn");
const $movieSlide = document.getElementById("movie_slide");


// 제목으로 영화 검색
const searchMovie = async () => {
    if ($searchContent.value === "") {
        window.alert("검색할 제목을 입력해주세요!!");
    } else {
        // 슬라이드 삭제
        $movieSlide.remove();
        // 현재 카드 리스트를 삭제
        $movieCards.replaceChildren();
        const movieData = await searchMovieData($searchContent.value);

        movieData.forEach(item => {
            appendCard(item.id, item.title, item.genre_ids, item.poster_path, item.vote_average, $movieCards);
        });
    }
}


// 버튼에 클릭으로 검색 이벤트 추가
export const addSearchBtnEvent = () => {
    $searchBtn.addEventListener("click", () => {
        searchMovie();
    });
}


// 엔터 입력 시 검색 이벤트 추가
export const addSearchEnterEvent = () => {
    window.addEventListener("keypress", (event) => {
        if (event.code === "Enter") {
            searchMovie();
        }
    });
}
