import { loadData } from "./data_load.js";
import { clearMovieDataList } from "./data_manage.js";

const $movieCards = document.querySelector("#movieCards");
const $activeClass = document.getElementsByClassName("active");
const $pageGroup = document.getElementById('page_item_group');
const $prevGroupPage = document.getElementById('prev_group_page');
const $nextGroupPage = document.getElementById('next_group_page');
let groupPage = 1;


// 현재 그룹 페이지 반환 함수
export const getGroupPage = () => {
    return groupPage;
}
// 그룹 페이지 변수 수정 (이전 그룹 페이지)
const setPrevGroupPage = () => {
    if (groupPage - 10 > 0) {
        return groupPage -= 10;
    }
}
// 그룹 페이지 변수 수정 (다음 그룹 페이지)
const setNextGroupPage = () => {
    return groupPage += 10;
}


// 페이지 그룹 이동 버튼에 이벤트 추가 함수
export const initPrevNextBtn = () => {
    $prevGroupPage.addEventListener('click', () => {
        setPrevGroupPage();
        $pageGroup.replaceChildren();
        printPagination(getGroupPage());
        $pageGroup.firstChild.click();
    });

    $nextGroupPage.addEventListener('click', () => {
        setNextGroupPage();
        $pageGroup.replaceChildren();
        printPagination(getGroupPage());
        $pageGroup.firstChild.click();
    });
}


// Pagination 클릭 이벤트 구현
const pagination = (item) => {
    item.addEventListener("click", () => {
        // 페이지 버튼의 활성화를 위한 코드
        $activeClass[1].className = $activeClass[1].className.replace(" active", "");
        item.className += " active";
        
        // 기존의 Card 삭제
        $movieCards.replaceChildren();
        clearMovieDataList();  // 페이지 단위로 검색 가능하게 할려고
        loadData(item.value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// 페이지네이션 출력
export const printPagination = (startPageNum) => {
    let html_tmp = ``;

    for (let i = 0; i < 10; i++){
        if (i === 0) {
            html_tmp = `<li class="page-item active" value="${startPageNum}"><a class="page-link">${startPageNum}</a></li>`;
        } else {
            html_tmp = `<li class="page-item" value="${startPageNum + i}"><a class="page-link">${startPageNum + i}</a></li>`;
        }
        $pageGroup.insertAdjacentHTML("beforeend", html_tmp);

        let pageBtn = $pageGroup.lastChild;
        pagination(pageBtn);
    }
}


