const $cursor = document.getElementById("cursor");


// 커서 모양 변화 함수 (생각보다 별로라서 사용X)
export const cursorChange = () => {
    window.addEventListener("mousemove", (e) => {
        // display 속성을 변경하여 fadeIn 효과 구현
        $cursor.style.display = "block";
        $cursor.style.top = e.pageY - 13 + "px";
        $cursor.style.left = e.pageX - 13 + "px";
    });

    // 대상 요소들에 대한 mouseover 이벤트 리스너 추가
    document.querySelectorAll(".card, .btn, .move_top_bottom, input, a, textarea, button").forEach((el) => {
        el.addEventListener("mouseover", () => {
            $cursor.style.width = "50px";
            $cursor.style.height = "50px";
            $cursor.style.background = "yellow";
            $cursor.style.opacity = 0.7;
        });

        el.addEventListener("mouseout", () => {
            $cursor.style.width = "25px";
            $cursor.style.height = "25px";
            $cursor.style.background = "yellow";
            $cursor.style.opacity = 1;
        });
    });
}