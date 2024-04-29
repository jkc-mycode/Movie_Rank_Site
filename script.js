import { loadData } from "./data_load.js";
import { addSearchEnterEvent, addSearchBtnEvent } from "./data_search.js";
import { scrollToTop, scrollToBottom } from "./move_top_bottom.js";
import { printPagination, getGroupPage, initPrevNextBtn } from "./pagination.js";

const $searchContent = document.getElementById("search_content");


// 처음 로딩 시 1페이지 출력
loadData(1);

// 페이지 로드 시 검색 창에 포커스
$searchContent.focus();

// Top 이동 버튼
scrollToTop();

// Bottom 이동 버튼
scrollToBottom();

// 버튼에 클릭으로 검색 이벤트 추가
addSearchBtnEvent();

// 엔터 입력 시 검색 이벤트
addSearchEnterEvent();

// 페이지 그룹 이동 버튼에 이벤트 추가 함수
initPrevNextBtn();

// 페이지네이션 출력
printPagination(getGroupPage());
