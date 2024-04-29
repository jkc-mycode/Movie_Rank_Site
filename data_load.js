import { appendCard } from "./card_append.js";
import { addMovieData } from "./data_manage.js";

const $movieCards = document.querySelector("#movieCards");


// TMDB API 정보
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjRmZDY5YzZkNTk3OThhMmRkNmM1YWY2NTc4YTYzNCIsInN1YiI6IjY2MjhhMzQzMzc4MDYyMDE3ZWRhNTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_c4jW2oTJJgwosGcrlqmYFVUfXks1TtdTfTZcEea3M'
    }
};

// TMDB에서 페이지번호에 따라 데이터를 가져오는 함수
export const loadData = async (pageNum) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}`, options)
        const data = await res.json();
        data.results.forEach(item => {
            appendCard(item.id, item.title, item.overview, item.poster_path, item.vote_average, $movieCards);
            addMovieData(item);  // 검색에서 사용할 전역 데이터 리스트
        });
    } catch(err) {
        console.error(err);
    }
}