const $moveTopBtn = document.getElementById("move_top_btn");
const $moveBottomBtn = document.getElementById("move_bottom_btn");


// Top 이동 버튼
export const scrollToTop = () => {
    $moveTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Bottom 이동 버튼
export const scrollToBottom = () => {
    $moveBottomBtn.addEventListener("click", () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
}
