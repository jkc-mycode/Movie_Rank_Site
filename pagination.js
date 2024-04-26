import { movieDataList } from "./script.js";
import { loadData } from "./data_load.js";

const $movieCards = document.querySelector("#movieCards");
const $pageValue = document.querySelectorAll(".page-item");
const $activeClass = document.getElementsByClassName("active");


// 유사 Pagination 구현
export const pagination = () => {
    $pageValue.forEach((item) => {
        item.addEventListener("click", async () => {
            // 페이지 버튼의 활성화를 위한 코드
            $activeClass[1].className = $activeClass[1].className.replace(" active", "");
            item.className += " active";
            
            // 기존의 Card 삭제
            $movieCards.replaceChildren();
            movieDataList.length = 0  // 페이지 단위로 검색 가능하게 할려고
            await loadData(item.value);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}
