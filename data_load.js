import { appendCard } from "./card_append.js";
import { addMovieData } from "./data_manage.js";

const $movieCards = document.querySelector("#movieCards");


// TMDB API 정보
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjRmZDY5YzZkNTk3OThhMmRkNmM1YWY2NTc4YTYzNCIsInN1YiI6IjY2MjhhMzQzMzc4MDYyMDE3ZWRhNTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_c4jW2oTJJgwosGcrlqmYFVUfXks1TtdTfTZcEea3M'
    }
};


// TMDB에서 페이지번호에 따라 데이터를 가져오는 함수
export const loadData = async (pageNum) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNum}`, options)
        const data = await res.json();
        console.log(data);
        data.results.forEach(item => {
            appendCard(item.id, item.title, item.genre_ids, item.poster_path, item.vote_average, $movieCards);
            addMovieData(item);  // 검색에서 사용할 전역 데이터 리스트
        });
    } catch(err) {
        console.error(err);
    }
}


// id 기반으로 TMDB에서 상세 데이터 fetch
export const loadDetailData = async (movie_id) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}


// id 기반으로 TMDB에서 출연진 데이터 fetch
export const loadCastData = async (movie_id) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=ko-KR`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}


// id 기반으로 TMDB에서 비디오 경로 fetch
export const loadVideoData = async (movie_id) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=ko-KR`, options);
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error(err);
    }
}


// 영상이 없을 경우 따로 처리
export const checkVideoData = (movieVideoData) => {
    let movieVideoDataForm = ``;

    if (movieVideoData.length === 0) {
        movieVideoDataForm = `영상이 없습니다.`;
    } else {
        movieVideoDataForm = `
        <a href="https://www.youtube.com/watch?v=${movieVideoData[0].key}"
            target="_blank">https://www.youtube.com/watch?v=${movieVideoData[0].key}</a>
        `
    }
    return movieVideoDataForm;
}