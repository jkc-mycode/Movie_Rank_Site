import { showModal } from "./detail_movie.js";
import { genre } from "./genre_data.js";


const localStorage = window.localStorage;

// 매개변수로 받은 영화 정보를 HTML코드에 넣어서 HTML파일에 삽입
export const appendCard = (id, title, genreIdList, posterPath, voteAverage, area) => {
    // 장르 span태그 템플릿
    let genre_tmp = appendGenre(genreIdList);

    const html_tmp = `
    <div class="col">
        <div class="card">
            <img src="https://image.tmdb.org/t/p/original${posterPath}" id="img_${id}" class="card-img-top" alt="${title}">
            <div class="card-body">
                <h5 class="card-title"> ${title} </h5>
                <div class="genre">${genre_tmp}</div>
                <p class="vote_rate"><b> Rating : ${voteAverage} </b></p>
            </div>
        </div>
    </div>
    `
    area.insertAdjacentHTML("beforeend", html_tmp);
    document.getElementById(`img_${id}`).addEventListener('click', async () => {
        // 이미지를 클릭하면 중복으로 클릭하지 못하게 CSS로 막음
        document.getElementById(`img_${id}`).classList.add('disable-pointer');
        await showModal(id);
    });
}

export const appendGenre = (genreIdList) => {
    let genre_tmp = ``;

    for (let i = 0; i < genreIdList.length; i++) {
        genre.forEach((item) => {
            if (genreIdList[i] === item["id"]) {
                genre_tmp += `<span class="color_${genreIdList[i]}"><b>${item["name"]}</b></span>`
            }
        })
    }

    return genre_tmp;
}