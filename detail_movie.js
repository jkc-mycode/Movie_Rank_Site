import { options } from "./data_load.js"
import { genre } from "./genre_data.js";
import { appendGenre } from "./card_append.js";
import { loadReviewForm, loadReview } from "./review_form.js";
import { loadDetailData, loadCastData, loadVideoData, checkVideoData } from "./data_load.js";


const $modalBox = document.getElementById('modal_box');
const $moviePoster = document.getElementById("movie_poster");
const $movieTitle = document.getElementById("movie_title");
const $movieGenre = document.getElementById("movie_genre");
const $movieOverview = document.getElementById("movie_overview");
const $movieCast = document.getElementById("movie_cast");
const $movieYoutubeLink = document.getElementById("movie_youtube_link");


const clearModalContent = () => {
    $moviePoster.innerHTML = " ";
    $movieTitle.innerHTML = " ";
    $movieGenre.innerHTML = " ";
    $movieOverview.innerHTML = " ";
    $movieCast.innerHTML = " ";
    $movieYoutubeLink.innerHTML = " ";
}


// 모달 창을 동적으로 열어주는 함수
export const showModal = async (id) => {
    // 모달 창 내용 초기화
    clearModalContent();

    // id 기반으로 TMDB에서 상세 데이터 fetch
    loadDetailData(id)
        .then((movieDetailData) => {
            // 장르의 id 값만 추출
            const genreArr = [];
            for (let item of movieDetailData.genres) {
                genreArr.push(item.id);
            }
            // 장르 HTML 형식 코드를 반환 받음
            const genre_tmp = appendGenre(genreArr);

            $moviePoster.insertAdjacentHTML("beforeend",
                `<img src="https://image.tmdb.org/t/p/original${movieDetailData.poster_path}" class="detail_poster"
                alt="${movieDetailData.title}">`
            );
            $movieTitle.insertAdjacentHTML("beforeend",
                `<b><span class="movie_title_kr">${movieDetailData.title}</span></b>
                <b><span>(${movieDetailData.release_date.substr(0, 4)})</span></b><br>
                <b><span>${movieDetailData.original_title}</span></b>`
            );
            $movieGenre.insertAdjacentHTML("beforeend",
                `<span><b>장르 : </b>${genre_tmp}</span>`
            );
            $movieOverview.insertAdjacentHTML("beforeend",
                `<span>${movieDetailData.overview}</span>`
            );
        });


    // id 기반으로 TMDB에서 출연진 데이터 fetch
    loadCastData(id)
        .then((movieCastData) => {
            // cast 이름 데이터 가공
            let castName = '';
            let count = 0;

            for (let item of movieCastData.cast) {
                castName += item.name;
                count++;

                if (count === 5) break;
                else castName += ', '
            }

            $movieCast.insertAdjacentHTML("beforeend",
                `<span><b>감독 : </b>${movieCastData.crew[0].name}</span><br>
                <span><b>출연진 : </b>${castName} ...</span>`
            )
        })



    // id 기반으로 TMDB에서 비디오 경로 fetch
    loadVideoData(id)
        .then((movieVideoData) => {
            // 영상이 없을 경우 따로 처리
            let movieVideoDataForm = checkVideoData(movieVideoData);

            $movieYoutubeLink.insertAdjacentHTML("beforeend",
                `<span><b>YouTube : </b>
                    ${movieVideoDataForm}
                </span>`
            )
        })

    loadReviewForm(id);

    loadReview(id);

    // 다시 클릭 가능하게 만들어줌
    $modalBox.addEventListener('hide.bs.modal', () => {
        document.getElementById(`img_${id}`).classList.remove('disable-pointer');
    });

    // 직접 부트스트랩의 Modal 객체를 만들어서 동작시킴
    const modalInstance = new bootstrap.Modal($modalBox);
    await modalInstance.show();
}