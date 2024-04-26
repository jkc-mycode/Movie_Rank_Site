import { loadData } from "./data_load.js";
import { searchEnter, searchBtn } from "./data_search.js";
import { moveTop, moveBottom } from "./move_top_bottom.js";
import { pagination } from "./pagination.js";

const $searchContent = document.getElementById("search_content");
export let movieDataList = [];  // 검색에서 사용할 전역 데이터 리스트


// 처음 로딩 시 1페이지 출력
loadData(1);

// 페이지 로드 시 검색 창에 포커스
$searchContent.focus();

// Top 이동 버튼
moveTop();

// Bottom 이동 버튼
moveBottom()

// 버튼에 클릭으로 검색 이벤트 추가
searchBtn()

// 엔터 입력 시 검색 이벤트
searchEnter();

// 유사 Pagination
pagination();